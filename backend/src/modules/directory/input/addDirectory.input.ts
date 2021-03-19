import { Field, InputType } from "type-graphql";

@InputType()
export class AddDirectoryInput {
    @Field()
    name: string;

    @Field()
    parentId: string;
}
