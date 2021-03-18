import { Field, InputType } from "type-graphql";

@InputType()
export class AddFileInput {
    @Field()
    name: string;

    @Field()
    parentId: string;

    @Field()
    content: string;
}
