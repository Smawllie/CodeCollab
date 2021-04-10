import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class GetProjectRolesOutput {
    @Field(() => Boolean)
    isOwner: boolean;

    @Field(() => Boolean)
    isCollaborator: boolean;
}
