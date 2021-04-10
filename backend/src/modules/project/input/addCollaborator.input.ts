import { Field, InputType } from "type-graphql";

@InputType({ description: "Schema for adding collaborators" })
export class AddCollaboratorInput {
    @Field({ description: "id of collaborator" })
    collaboratorId: string;

    @Field({ description: "id of project" })
    projectId: string;
}
