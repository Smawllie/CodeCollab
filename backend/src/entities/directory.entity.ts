import {
    getDiscriminatorModelForClass,
    prop as Property,
    Ref,
} from "@typegoose/typegoose";

import { Field, ObjectType } from "type-graphql";

import { Resource, ResourceModel } from "./resource.entity";

@ObjectType()
export class Directory extends Resource {
    @Field(() => [Resource])
    @Property({ ref: "Resource", default: [], required: true })
    contents: Ref<Resource>[];

    _doc: any;
}

export const DirectoryModel = getDiscriminatorModelForClass(
    ResourceModel,
    Directory
);
