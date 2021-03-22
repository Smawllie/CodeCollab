import { Field, InputType } from "type-graphql";

@InputType()
export class AddCollaboratorInput {
    @Field()
    collaboratorId: string;

    @Field()
    projectId: string;
}
