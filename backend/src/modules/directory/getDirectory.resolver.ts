import { Arg, Authorized, Query, Resolver } from "type-graphql";

import { Directory, DirectoryModel } from "../../entities/directory.entity";

@Resolver()
export class GetDirectoryResolver {
    @Query(() => Directory)
    @Authorized()
    async getDirectoryById(@Arg("id") id: String) {
        let directory = await DirectoryModel.findById(id).exec();

        if (!directory)
            throw new Error(`Directory with id: ${id} does not exist`);

        return directory;
    }
}
