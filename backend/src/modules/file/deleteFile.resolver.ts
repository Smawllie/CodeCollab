import { isDocument } from "@typegoose/typegoose";
import { AuthenticationError } from "apollo-server-errors";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";

import { FileModel } from "../../entities/file.entity";
import { ProjectModel } from "../../entities/project.entity";
import { Context } from "../../context";

@Resolver()
export class DeleteFileResolver {
    @Mutation(() => Boolean, {
        description:
            "unused currently but can be used for extending to other languages",
    })
    async deleteFile(
        @Arg("id", { description: "file id" }) id: String,
        @Ctx() context: Context
    ) {
        let file = await FileModel.findById(id)
            .populate({ path: "project", model: "Project" })
            .exec();

        if (!file) throw new Error(`File with id: ${id} does not exist`);

        let userId = context.req.session.userId;

        if (isDocument(file.project)) {
            let isOwner = file.project!.owner!.toString() === userId;
            let isCollaborator = file.project.collaborators.some(
                (collaboratorId: any) => collaboratorId.toString() === userId
            );

            if (!isOwner && !isCollaborator)
                throw new AuthenticationError(
                    `You must be a collaborator or owner of this project to delete this file`
                );
        }

        let project = await ProjectModel.findById(file.project).exec();

        if (!project)
            throw new Error(`Project with id: ${file.project} does not exist`);

        project.files = project.files.filter((fileId) => fileId === file!._id);

        await Promise.all([project.save(), file.remove()]);

        return true;
    }
}
