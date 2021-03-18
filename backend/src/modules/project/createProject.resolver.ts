import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";

import { Context } from "../../context";
import { Project, ProjectModel } from "../../entities/project.entity";
import { CreateProjectInput } from "./input/createProject.input";
import { UserModel } from "../../entities/user.entity";
import { DirectoryModel } from "../../entities/directory.entity";

@Resolver()
export class CreateProjectResolver {
    @Mutation(() => Project)
    @Authorized()
    async createProject(
        @Arg("project") { name }: CreateProjectInput,
        @Ctx() context: Context
    ): Promise<Project> {
        // Check if user exists
        let user = await UserModel.findById(context.req.session.userId);

        if (!user)
            throw new Error(
                `User ID ${context.req.session.userId} does not exist`
            );

        // Create new project and its root directory
        let project = new ProjectModel({
            name,
            owner: user,
        });

        let root = new DirectoryModel({
            name: project._id,
            project,
        });

        // Add project root directory to the object
        project.root = root._id;

        // Add the newly created project to the user
        user.createdProjects.push(project._id);

        // Save it all to the database
        await root.save();
        await project.save();
        await user.save();

        return project;
    }
}
