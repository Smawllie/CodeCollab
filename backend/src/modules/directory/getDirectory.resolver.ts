import { Arg, Authorized, Query, Resolver } from "type-graphql";

import { Directory, DirectoryModel } from "../../entities/directory.entity";

@Resolver()
export class GetDirectoryResolver {
    @Query(() => Directory)
    @Authorized()
    async getDirectoryById(@Arg("id") id: String) {
        return new Promise((res, _) =>
            DirectoryModel.findById(id, (err: any, directory: Directory) => {
                if (err) throw new Error();

                if (!directory)
                    throw new Error(`Directory with id: ${id} does not exist`);

                res(directory);
            })
        );
    }
}
