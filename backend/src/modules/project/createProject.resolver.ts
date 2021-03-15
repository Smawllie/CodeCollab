import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";

import { Context } from "../../context";
import { Project, ProjectModel } from "../../entities/project.entity";
import { CreateProjectInput } from "./input/createProject.input";
import { UserModel } from "../../entities/user.entity";

@Resolver()
export class CreateProjectResolver {
    @Mutation(() => Project)
    @Authorized()
    async createProject(
        @Arg("project") { name }: CreateProjectInput,
        @Ctx() context: Context
    ): Promise<Project> {
        let user = await UserModel.findById(context.req.session.userId);

        if (!user)
            throw new Error(
                `User ID ${context.req.session.userId} does not exist`
            );

        let project = new ProjectModel({
            name,
            owner: user,
        });

        user.createdProjects.push(project);

        await project.save();
        await user.save();

        return project;
    }
}
