import { Arg, Authorized, Ctx, Query, Resolver } from "type-graphql";

import { Context } from "../../context";
import { ProjectModel } from "../../entities/project.entity";
import { GetProjectRolesOutput } from "./output/getProjectRoles.output";

@Resolver()
export class GetProjectRoles {
    @Query(() => GetProjectRolesOutput)
    @Authorized()
    async getProjectRoles(
        @Arg("projectId") projectId: String,
        @Ctx() context: Context
    ) {
        let project = await ProjectModel.findById(projectId).exec();

        if (!project)
            throw new Error(`Project with id: ${projectId} does not exist`);

        let userId = context.req.session.userId;
        let isOwner = project.owner!.toString() === userId;
        let isCollaborator = project.collaborators.some(
            (collaboratorId: any) => collaboratorId.toString() === userId
        );

        return { isOwner, isCollaborator };
    }
}
