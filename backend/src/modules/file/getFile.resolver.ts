import { Arg, Authorized, Query, Resolver } from "type-graphql";

import { File, FileModel } from "../../entities/file.entity";

@Resolver()
export class GetFileResolver {
    @Query(() => File, {
        description:
            "unused currently but can be used for extending to other languages",
    })
    @Authorized()
    async getFileById(@Arg("id", { description: "file id" }) id: String) {
        let file = await FileModel.findById(id).exec();

        if (!file) throw new Error(`File with id: ${id} does not exist`);

        return file;
    }
}
