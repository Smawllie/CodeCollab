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

import { File, FileModel } from "./file.entity";
import { User, UserModel } from "./user.entity";

@ObjectType({ description: "Each project contains html, css, and js" })
export class Project {
    @Field(() => ID, { description: "id of project" })
    _id: Types.ObjectId;

    @Field({ description: "name of project" })
    @Property({ required: true })
    name: string;

    @Field(() => User, { description: "owner of project" })
    @Property({ ref: "User", required: true })
    owner: Ref<User>;

    @Field(() => [File], {
        description:
            "files in project (currently unused but helpful for extension)",
    })
    @Property({ ref: "File", required: true })
    files: Ref<File>[];

    @Field(() => String, { description: "html file of project" })
    @Property({ required: true })
    html: Types.ObjectId;

    @Field(() => String, { description: "css file of project" })
    @Property({ required: true })
    css: Types.ObjectId;

    @Field(() => String, { description: "js file of project" })
    @Property({ required: true })
    js: Types.ObjectId;

    @Field(() => [User], { description: "list of collaborators of project" })
    @Property({ ref: "User", required: true, default: [] })
    collaborators: Ref<User>[];

    _doc: any;
}

export const ProjectModel = getModelForClass(Project);

@Resolver(() => Project)
export class ProjectFieldResolver {
    @FieldResolver(() => User)
    async owner(@Root() project: Project) {
        return UserModel.findById(project._doc.owner).exec();
    }

    @FieldResolver(() => [File])
    async files(@Root() project: Project) {
        return Promise.all(
            project._doc.files.map((fileId: any) =>
                FileModel.findById(fileId).exec()
            )
        );
    }

    @FieldResolver(() => [User])
    async collaborators(@Root() project: Project) {
        return Promise.all(
            project._doc.collaborators.map((userId: any) =>
                UserModel.findById(userId).exec()
            )
        );
    }
}
