import { Field, InputType } from "type-graphql";

@InputType({
    description:
        "unused currently but can be used for extending to GraphQL subscriptions",
})
export class SubscribeProjectInput {
    @Field({ description: "id of project" })
    projectId: string;
}
