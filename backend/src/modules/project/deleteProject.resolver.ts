import { AuthenticationError } from "apollo-server-errors";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";

import { Context } from "../../context";
import { ProjectModel } from "../../entities/project.entity";
import { FileModel } from "../../entities/file.entity";
import { UserModel } from "../../entities/user.entity";

@Resolver()
export class DeleteProjectResolver {
    @Mutation(() => Boolean)
    async deleteProject(@Arg("id") id: String, @Ctx() context: Context) {
        let project = await ProjectModel.findById(id).exec();

        if (!project) throw new Error(`Project with id: ${id} does not exist`);

        let userId = context.req.session.userId;

        let isOwner = project.owner!.toString() === userId;

        if (!isOwner)
            throw new AuthenticationError(
                `You must be the owner of this project to delete it`
            );

        // Delete from owner
        let owner = await UserModel.findById(project.owner);

        if (!owner)
            throw new Error(`User with id: ${project.owner} does not exist`);

        owner.createdProjects = owner.createdProjects.filter(
            (projectId) => projectId === project!._id
        );

        // Delete from shared projects for all collaborators
        await Promise.all(
            project.collaborators.map(async (collaboratorId) => {
                let collaborator = await UserModel.findById(
                    collaboratorId
                ).exec();

                collaborator!.sharedProjects = collaborator!.sharedProjects.filter(
                    (projectId) => projectId === project!._id
                );

                collaborator!.save();
            })
        );

        // Delete all files associated with the project
        let deleteProjectFiles = FileModel.deleteMany({
            project: project._id,
        }).exec();

        await Promise.all([deleteProjectFiles, owner.save(), project.delete()]);

        return true;
    }
}
