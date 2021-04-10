import { IsEmail } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType({ description: "Input type for adding collaborators" })
export class AddCollaboratorInput {
    @Field({ description: "Email of collaborator" })
    @IsEmail()
    collaboratorEmail: string;

    @Field({ description: "ID of project" })
    projectId: string;
}
