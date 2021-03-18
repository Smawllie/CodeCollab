import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";

import { File, FileModel } from "../../entities/file.entity";
import { ProjectModel } from "../../entities/project.entity";
import { Context } from "../../context";
import { AuthenticationError } from "apollo-server-errors";
import { WriteFileInput } from "./input/writeFile.input";

@Resolver()
export class WriteFileResolver {
    @Mutation(() => File)
    @Authorized()
    // TODO: Add writeFile input object
    async writeFile(
        @Arg("file") { fileId, content }: WriteFileInput,
        @Ctx() context: Context
    ) {
        let file = await FileModel.findById(fileId);

        if (!file) throw new Error(`File with id: ${fileId} does not exist`);

        let project = await ProjectModel.findById(file.project);

        if (project!.owner!.toString() !== context.req.session.userId)
            throw new AuthenticationError("Access Denied");

        file.content = content;
        await file.save();

        return file;
    }
}
