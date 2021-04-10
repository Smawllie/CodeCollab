import { Field, InputType } from "type-graphql";

@InputType({ description: "Input type for creating a project" })
export class CreateProjectInput {
    @Field({ description: "Name of new project" })
    name: string;
}
