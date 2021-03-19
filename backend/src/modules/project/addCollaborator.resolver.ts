import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";

import { Project, ProjectModel } from "../../entities/project.entity";
import { AddCollaboratorInput } from "./input/addCollaborator.input";
import { Context } from "../../context";
import { UserModel } from "../../entities/user.entity";

@Resolver()
export class AddCollaboratorResolver {
    @Mutation(() => Project)
    @Authorized()
    async addCollaborator(
        @Arg("project") { collaboratorId, projectId }: AddCollaboratorInput,
        @Ctx() context: Context
    ) {
        let project = await ProjectModel.findById(projectId).exec();

        if (!project)
            throw new Error(`Project with id: ${projectId} does not exist`);

        let userId = context.req.session.userId;
        let isOwner = project.owner!.toString() === userId;

        if (!isOwner)
            throw new Error(
                "You must be the owner of the project to add a new collaborator"
            );

        let collaboratorExists = project.collaborators.some(
            (userId: any) => userId.toString() === collaboratorId
        );

        if (collaboratorExists)
            throw new Error(
                `The user with id: ${collaboratorId} already is a collaborator`
            );

        let collaborator = await UserModel.findById(collaboratorId).exec();

        if (!collaborator)
            throw new Error(`User with id: ${collaboratorId} does not exist`);

        project.collaborators.push(collaborator._id);
        await project.save();

        return project;
    }
}
