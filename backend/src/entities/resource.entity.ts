import { getModelForClass, prop as Property, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Field, ObjectType, ID } from "type-graphql";

import { Directory } from "./directory.entity";
import { Project } from "./project.entity";

@ObjectType()
export class Resource {
    @Field(() => ID)
    _id: Types.ObjectId;

    @Field()
    @Property({ required: true })
    name: string;

    @Field(() => Project)
    @Property({ ref: "Project", required: true })
    project: Ref<Project>;

    @Field(() => Directory, { nullable: true })
    @Property({ ref: "Directory", default: null })
    parent: Ref<Directory>;

    @Field(() => String)
    @Property({ required: true })
    location: string;

    _doc: any;
}

export const ResourceModel = getModelForClass(Resource);
