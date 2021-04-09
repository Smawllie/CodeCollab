import { getModelForClass, prop as Property, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import {
    Field,
    ObjectType,
    ID,
    Resolver,
    FieldResolver,
    Root,
} from "type-graphql";

import { Project, ProjectModel } from "./project.entity";

@ObjectType({ description: "Users created on signup" })
export class User {
    @Field(() => ID, { description: "id of user" })
    _id: Types.ObjectId;

    @Field({ description: "email of user" })
    @Property({ required: true, unique: true })
    email: string;

    @Field({
        nullable: true,
        description: "username of user (currently unused)",
    })
    username: string;

    @Property({ required: true, description: "password of user" })
    passwordHash: string;

    @Field({
        nullable: true,
        description: "first name of user (currently unused)",
    })
    @Property()
    firstName: string;

    @Field({
        nullable: true,
        description: "last name of user (currently unused)",
    })
    @Property()
    lastName: string;

    @Field(() => [Project], { description: "projects owned by user" })
    @Property({ ref: "Project", default: [] })
    createdProjects: Ref<Project>[];

    @Field(() => [Project], { description: "projects shared with user" })
    @Property({ ref: "Project", default: [] })
    sharedProjects: Ref<Project>[];

    _doc: any;
}

export const UserModel = getModelForClass(User);

@Resolver(() => User)
export class UserFieldResolver {
    @FieldResolver()
    async createdProjects(@Root() user: User) {
        return Promise.all(
            user._doc.createdProjects.map((projectId: any) =>
                ProjectModel.findById(projectId).exec()
            )
        );
    }

    @FieldResolver()
    async sharedProjects(@Root() user: User) {
        return Promise.all(
            user._doc.sharedProjects.map((projectId: any) =>
                ProjectModel.findById(projectId).exec()
            )
        );
    }
}
