import { IsEmail } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType({ description: "Schema for adding collaborators" })
export class AddCollaboratorInput {
    @Field({ description: "email of collaborator" })
    @IsEmail()
    collaboratorEmail: string;

    @Field({ description: "id of project" })
    projectId: string;
}
