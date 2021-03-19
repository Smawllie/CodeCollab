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

import { Directory, DirectoryModel } from "./directory.entity";
import { Project, ProjectModel } from "./project.entity";

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

    _doc: any;
}

export const ResourceModel = getModelForClass(Resource);

@Resolver(() => Resource)
export class ResourceFieldResolver {
    @FieldResolver()
    async project(@Root() resource: Resource) {
        return ProjectModel.findById(resource._doc.project).exec();
    }

    @FieldResolver()
    async parent(@Root() resource: Resource) {
        return DirectoryModel.findById(resource._doc.parent).exec();
    }
}
