import { Arg, Authorized, Mutation, Resolver } from "type-graphql";

import { File, FileModel } from "../../entities/file.entity";
import { DirectoryModel } from "../../entities/directory.entity";
import { AddFileInput } from "./input/addFile.input";

@Resolver()
export class AddFileResolver {
    @Mutation(() => File)
    @Authorized()
    async addFile(@Arg("file") { name, parentId, content }: AddFileInput) {
        let directory = await DirectoryModel.findById(parentId);

        if (!directory)
            throw new Error(`Directory with id: ${parentId} does not exist`);

        let file = new FileModel({
            name,
            project: directory.project,
            parent: directory._id,
            content,
        });

        directory.contents.push(file._id);
        await directory.save();
        await file.save();

        return file;
    }
}
