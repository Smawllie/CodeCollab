import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { AuthenticationError } from "apollo-server-express";
import { isDocument, isDocumentArray } from "@typegoose/typegoose";

import { File, FileModel } from "../../entities/file.entity";
import { DirectoryModel } from "../../entities/directory.entity";
import { AddFileInput } from "./input/addFile.input";
import { Context } from "../../context";

@Resolver()
export class AddFileResolver {
    @Mutation(() => File)
    @Authorized()
    async addFile(
        @Arg("file") { name, parentId, content }: AddFileInput,
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
                    `You must be a collaborator or owner of this project to add a new file`
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

        let file = new FileModel({
            name,
            project: parent.project,
            parent: parent._id,
            content,
        });

        parent.contents.push(file._id);
        await Promise.all([parent.save(), file.save()]);

        return file;
    }
}
