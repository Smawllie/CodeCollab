import { Field, InputType } from "type-graphql";

@InputType({ description: "Schema for saving a project" })
export class SaveWebProjectInput {
    @Field({ description: "id of project" })
    projectId: string;

    @Field({ description: "html of project" })
    html: string;

    @Field({ description: "css of project" })
    css: string;

    @Field({ description: "js of project" })
    js: string;
}
