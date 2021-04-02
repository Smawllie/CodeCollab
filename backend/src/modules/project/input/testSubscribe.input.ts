import { Field, InputType } from "type-graphql";

@InputType()
export class SubscribeProjectInput {
    @Field()
    projectId: string;

    @Field()
    html: string;

    @Field()
    css: string;

    @Field()
    js: string;
}

@InputType()
export class MyArgs {
    @Field()
    myArg: string;
}

