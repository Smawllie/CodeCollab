import { Field, InputType } from "type-graphql";

@InputType()
export class SubscribeProjectInput {
    @Field()
    projectId: string;
}
