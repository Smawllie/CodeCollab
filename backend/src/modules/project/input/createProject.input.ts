import { Field, InputType } from "type-graphql";

@InputType({ description: "Schema for creating a project" })
export class CreateProjectInput {
    @Field({ description: "name of project" })
    name: string;
}
