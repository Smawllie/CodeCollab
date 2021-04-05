import { Field, InputType } from "type-graphql";

@InputType()
export class SaveWebProjectInput {
    @Field()
    projectId: string;

    @Field()
    html: string;

    @Field()
    css: string;

    @Field()
    js: string;
}
