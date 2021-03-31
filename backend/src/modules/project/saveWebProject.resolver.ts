import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";

import { Project, ProjectModel } from "../../entities/project.entity";
import { SaveWebProjectInput } from "./input/saveWebProject.input";
import { Context } from "../../context";
import { AuthenticationError } from "apollo-server-errors";

@Resolver()
export class SaveWebProjectResolver {
    @Mutation(() => Project)
    @Authorized()
    async saveWebProject(
        @Arg("project") { projectId, html, css, js }: SaveWebProjectInput,
        @Ctx() context: Context
    ) {
        let project = await ProjectModel.findById(projectId).exec();

        if (!project)
            throw new Error(`File with id: ${projectId} does not exist`);

        let userId = context.req.session.userId;

        let isOwner = project.owner!.toString() === userId;
        let isCollaborator = project.collaborators.some(
            (collaboratorId: any) => collaboratorId.toString() === userId
        );

        if (!isOwner && !isCollaborator)
            throw new AuthenticationError(
                `You must be a collaborator or owner of this project to save to it`
            );

        project.html = html;
        project.css = css;
        project.js = js;
        await project.save();

        return project;
    }
}
