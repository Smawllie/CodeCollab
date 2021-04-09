import { Field, InputType } from "type-graphql";

@InputType({ description: "Schema for adding files" })
export class AddFileInput {
    @Field({ description: "name of file" })
    name: string;

    @Field({ description: "id of file" })
    projectId: string;

    @Field({ description: "content of file" })
    content: string;
}
