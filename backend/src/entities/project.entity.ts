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

    @Field(() => [File])
    @Property({ ref: "File", required: true })
    files: Ref<File>[];

    @Field(() => String)
    @Property({ required: true })
    html: Types.ObjectId;

    @Field(() => String)
    @Property({ required: true })
    css: Types.ObjectId;

    @Field(() => String)
    @Property({ required: true })
    js: Types.ObjectId;

    @Field(() => [User])
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
