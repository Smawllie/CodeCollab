import {
    getDiscriminatorModelForClass,
    prop as Property,
    Ref,
} from "@typegoose/typegoose";

import { Field, FieldResolver, ObjectType, Resolver, Root } from "type-graphql";

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

@Resolver(() => Directory)
export class DirectoryFieldResolver {
    @FieldResolver()
    async contents(@Root() directory: Directory): Promise<Resource[]> {
        return Promise.all(
            directory._doc.contents.map((resourceId: any) =>
                ResourceModel.findById(resourceId).exec()
            )
        );
    }
}
