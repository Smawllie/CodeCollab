import { GraphQLUpload, FileUpload } from "graphql-upload";
import { createWriteStream } from "fs";
import { Arg, Mutation, Resolver } from "type-graphql";

@Resolver()
export class UploadFileResolver {
    @Mutation(() => Boolean)
    async uploadFile(
        @Arg("file", () => GraphQLUpload)
        { createReadStream, filename }: FileUpload
    ) {
        console.log(filename);
        const writableStream = createWriteStream(__dirname + `/${filename}`);

        return new Promise((res, rej) => {
            createReadStream()
                .pipe(writableStream)
                .on("finish", () => res(true))
                .on("error", () => rej(false));
        });
    }
}
