import { getModelForClass, prop as Property, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Field, ObjectType, ID } from "type-graphql";

import { Project } from "./project.entity";

@ObjectType()
export class User {
    @Field(() => ID)
    _id: Types.ObjectId;

    @Field()
    @Property({ required: true, unique: true })
    email: string;

    @Field()
    @Property({ required: true, unique: true })
    username: string;

    @Property({ required: true })
    passwordHash: string;

    @Field({ nullable: true })
    @Property()
    firstName: string;

    @Field({ nullable: true })
    @Property()
    lastName: string;

    @Field(() => [Project])
    @Property({ ref: "Project" })
    createdProjects: Ref<Project>[];
}

export const UserModel = getModelForClass(User);
