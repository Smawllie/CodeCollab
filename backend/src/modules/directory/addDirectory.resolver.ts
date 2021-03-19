import { Arg, Authorized, Mutation, Resolver } from "type-graphql";

import { AddDirectoryInput } from "./input/addDirectory.input";
import { Directory, DirectoryModel } from "../../entities/directory.entity";

@Resolver()
export class AddDirectoryResolver {
    @Mutation(() => Directory)
    @Authorized()
    async addDirectory(
        @Arg("directory") { name, parentId }: AddDirectoryInput
    ) {
        let parent = await DirectoryModel.findById(parentId);

        if (!parent)
            throw new Error(`Directory with id: ${parentId} does not exist`);

        let directory = new DirectoryModel({
            name,
            project: parent.project,
            parent: parent._id,
        });

        parent.contents.push(directory._id);
        await parent.save();
        await directory.save();

        return directory;
    }
}
