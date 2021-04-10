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

// File type
@ObjectType({
    description:
        "Currently not used but can be used for extending to other programming languages",
})
export class File {
    @Field(() => ID, { description: "id of file" })
    _id: Types.ObjectId;

    @Field({ description: "name of file" })
    @Property({ required: true })
    name: string;

    @Field(() => Project, { description: "project the file is in" })
    @Property({ ref: "Project", required: true })
    project: Ref<Project>;

    @Field({ description: "content of file" })
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
