import { Field, InputType } from "type-graphql";

@InputType()
export class WriteFileInput {
    @Field()
    fileId: string;

    @Field()
    content: string;
}
