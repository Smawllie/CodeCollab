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

@ObjectType({ description: "User account created on sign up" })
export class User {
    @Field(() => ID, { description: "ID of user" })
    _id: Types.ObjectId;

    @Field({ description: "Email of user" })
    @Property({ required: true, unique: true })
    email: string;

    @Property({ required: true })
    passwordHash: string;

    @Field(() => [Project], { description: "Projects the user has created" })
    @Property({ ref: "Project", default: [] })
    createdProjects: Ref<Project>[];

    @Field(() => [Project], { description: "Projects shared with the user" })
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
