import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { AuthenticationError } from "apollo-server-express";
import { isDocumentArray } from "@typegoose/typegoose";

import { File, FileModel } from "../../entities/file.entity";
import { AddFileInput } from "./input/addFile.input";
import { Context } from "../../context";
import { ProjectModel } from "src/entities/project.entity";

@Resolver()
export class AddFileResolver {
    @Mutation(() => File)
    @Authorized()
    async addFile(
        @Arg("file") { name, projectId, content }: AddFileInput,
        @Ctx() context: Context
    ) {
        let project = await ProjectModel.findById(projectId)
            .populate({ path: "files", model: "File" })
            .exec();

        if (!project)
            throw new Error(`Project with id: ${projectId} does not exist`);

        let userId = context.req.session.userId;

        let isOwner = project.owner!.toString() === userId;
        let isCollaborator = project.collaborators.some(
            (collaboratorId: any) => collaboratorId.toString() === userId
        );

        if (!isOwner && !isCollaborator)
            throw new AuthenticationError(
                `You must be a collaborator or owner of this project to add a new file`
            );

        if (isDocumentArray(project.files)) {
            let fileNameExists = project.files.some(
                (file) => file.name === name
            );

            if (fileNameExists)
                throw new Error(
                    `This project already contains a file with name: ${name}`
                );
        }

        let file = new FileModel({
            name,
            project: project._id,
            content,
        });

        project.files.push(file._id);
        await Promise.all([file.save(), project.save()]);

        return file;
    }
}
