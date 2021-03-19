import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { isDocument, isDocumentArray } from "@typegoose/typegoose";
import { AuthenticationError } from "apollo-server-errors";

import { AddDirectoryInput } from "./input/addDirectory.input";
import { Directory, DirectoryModel } from "../../entities/directory.entity";
import { Context } from "../../context";

@Resolver()
export class AddDirectoryResolver {
    @Mutation(() => Directory)
    @Authorized()
    async addDirectory(
        @Arg("directory") { name, parentId }: AddDirectoryInput,
        @Ctx() context: Context
    ) {
        let parent = await DirectoryModel.findById(parentId)
            .populate({ path: "project", model: "Project" })
            .populate({ path: "contents", model: "Resource" })
            .exec();

        if (!parent)
            throw new Error(`Directory with id: ${parentId} does not exist`);

        let userId = context.req.session.userId;

        if (isDocument(parent.project)) {
            let isOwner = parent.project!.owner!.toString() === userId;
            let isCollaborator = parent.project.collaborators.some(
                (collaboratorId: any) => collaboratorId.toString() === userId
            );

            if (!isOwner && !isCollaborator)
                throw new AuthenticationError(
                    `You must be a collaborator or owner of this project to add a new directory`
                );
        }

        if (isDocumentArray(parent.contents)) {
            let resourceNameExists = parent.contents.some(
                (resource) => resource.name === name
            );

            if (resourceNameExists)
                throw new Error(
                    `This directory already contains an item with name: ${name}`
                );
        }

        let directory = new DirectoryModel({
            name,
            project: parent.project,
            parent: parent._id,
        });

        parent.contents.push(directory._id);

        await Promise.all([parent.save(), directory.save()]);

        return directory;
    }
}
