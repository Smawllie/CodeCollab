import { getModelForClass, prop as Property, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import {
    Field,
    FieldResolver,
    ID,
    ObjectType,
    Resolver,
    Root,
} from "type-graphql";

import { Project, ProjectModel } from "./project.entity";

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

@Resolver(() => File)
export class FileFieldResolver {
    @FieldResolver(() => Project)
    async project(@Root() file: File) {
        return ProjectModel.findById(file._doc.project).exec();
    }
}
