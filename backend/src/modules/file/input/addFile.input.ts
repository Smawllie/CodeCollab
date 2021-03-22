import { Field, InputType } from "type-graphql";

@InputType()
export class AddFileInput {
    @Field()
    name: string;

    @Field()
    projectId: string;

    @Field()
    content: string;
}
