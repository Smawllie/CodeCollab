import { Arg, Authorized, Query, Resolver } from "type-graphql";

import { File, FileModel } from "../../entities/file.entity";

@Resolver()
export class GetFileResolver {
    // TODO: Use input class
    @Query(() => File)
    @Authorized()
    async getFileById(@Arg("id") id: String) {
        return new Promise((res, _) =>
            FileModel.findById(id, (err: any, file: File) => {
                if (err) throw new Error("");

                if (!file)
                    throw new Error(`File with id: ${id} does not exist`);

                res(file);
            })
        );
    }
}
