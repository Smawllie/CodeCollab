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

    @Field(() => Directory)
    @Property({ ref: "Directory", required: true })
    root: Ref<Directory>;

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

    @FieldResolver(() => Directory)
    async root(@Root() project: Project) {
        return DirectoryModel.findById(project._doc.root).exec();
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
