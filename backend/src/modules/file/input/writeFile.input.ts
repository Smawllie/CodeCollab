import { Field, InputType } from "type-graphql";

@InputType({ description: "Schema for writing to a file" })
export class WriteFileInput {
    @Field({ description: "id of file" })
    fileId: string;

    @Field({ description: "content of file" })
    content: string;
}
