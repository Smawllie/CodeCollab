import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";

import { Project, ProjectModel } from "../../entities/project.entity";
import { AddCollaboratorInput } from "./input/addCollaborator.input";
import { Context } from "../../context";
import { UserModel } from "../../entities/user.entity";

@Resolver()
export class AddCollaboratorResolver {
    @Mutation(() => Project, {
        description: "Mutation for adding collaborators to a project",
    })
    @Authorized()
    async addCollaborator(
        @Arg("project", {
            description: "Contains collaborator email and project ID",
        })
        { collaboratorEmail, projectId }: AddCollaboratorInput,
        @Ctx() context: Context
    ) {
        let project = await ProjectModel.findById(projectId).exec();

        if (!project)
            throw new Error(`Project with id: ${projectId} does not exist`);

        let userId = context.req.session.userId;
        let isOwner = project.owner!.toString() === userId;
        let collaborator = await UserModel.findOne({
            email: collaboratorEmail,
        }).exec();

        if (!collaborator)
            throw new Error(
                `User with email: ${collaboratorEmail} does not exist`
            );

        if (!isOwner)
            throw new Error(
                "You must be the owner of the project to add a new collaborator"
            );

        let collaboratorExists =
            project.collaborators.some(
                (userId: any) =>
                    userId.toString() === collaborator!._id.toString()
            ) || project!.owner!.toString() === collaborator!._id.toString();

        if (collaboratorExists)
            throw new Error(
                `The user with email: ${collaboratorEmail} already is a collaborator or is the owner`
            );

        collaborator.sharedProjects.push(project._id);
        project.collaborators.push(collaborator._id);
        await Promise.all([project.save(), collaborator.save()]);

        return project;
    }
}
