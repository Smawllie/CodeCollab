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

import { User, UserModel } from "./user.entity";

@ObjectType({
    description: "A single page web project containing HTML, CSS and JS",
})
export class Project {
    @Field(() => ID, { description: "ID of project" })
    _id: Types.ObjectId;

    @Field({ description: "Name of project" })
    @Property({ required: true })
    name: string;

    @Field(() => User, { description: "Owner of project" })
    @Property({ ref: "User", required: true })
    owner: Ref<User>;

    @Field(() => String, { description: "ID for HTML file of project" })
    @Property({ required: true })
    html: Types.ObjectId;

    @Field(() => String, { description: "ID for CSS file of project" })
    @Property({ required: true })
    css: Types.ObjectId;

    @Field(() => String, { description: "ID for JS file of project" })
    @Property({ required: true })
    js: Types.ObjectId;

    @Field(() => [User], {
        description: "List of collaborators for the project",
    })
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

    @FieldResolver(() => [User])
    async collaborators(@Root() project: Project) {
        return Promise.all(
            project._doc.collaborators.map((userId: any) =>
                UserModel.findById(userId).exec()
            )
        );
    }
}
