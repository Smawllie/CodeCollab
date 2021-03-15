import {
    getDiscriminatorModelForClass,
    prop as Property,
} from "@typegoose/typegoose";

import { Field, ObjectType } from "type-graphql";

import { Resource, ResourceModel } from "./resource.entity";

@ObjectType()
export class File extends Resource {
    @Field()
    @Property({ required: true, default: "" })
    content: string;

    _doc: any
}

export const FileModel = getDiscriminatorModelForClass(ResourceModel, File);
