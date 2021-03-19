import { getModelForClass, prop as Property, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";

import { Field, ID, ObjectType } from "type-graphql";
import { Project } from "./project.entity";

@ObjectType()
export class File {
    @Field(() => ID)
    _id: Types.ObjectId;

    @Field()
    @Property({ required: true })
    name: string;

    @Field(() => Project)
    @Property({ ref: "Project", required: true })
    project: Ref<Project>;

    @Field()
    @Property({ required: true, default: "" })
    content: string;

    _doc: any;
}

export const FileModel = getModelForClass(File);
