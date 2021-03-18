import { getModelForClass, prop as Property, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Field, ObjectType, ID } from "type-graphql";
import { Directory } from "./directory.entity";

import { User } from "./user.entity";

@ObjectType()
export class Project {
    @Field(() => ID)
    _id: Types.ObjectId;

    @Field()
    @Property({ required: true })
    name: string;

    @Field(() => User)
    @Property({ ref: "User", required: true })
    owner: Ref<User>;

    @Field(() => Directory)
    @Property({ ref: "Directory", required: true })
    root: Ref<Directory>;

    _doc: any;
}

export const ProjectModel = getModelForClass(Project);
