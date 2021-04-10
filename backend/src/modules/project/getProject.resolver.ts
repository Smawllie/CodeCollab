import { Arg, Resolver, Query, Authorized } from "type-graphql";

import { Project, ProjectModel } from "../../entities/project.entity";

@Resolver()
export class GetProjectResolver {
    @Query(() => Project, { description: "Query to get project by its ID" })
    @Authorized()
    async getProjectById(
        @Arg("id", { description: "ID of project" }) id: String
    ) {
        let project = await ProjectModel.findById(id).exec();

        if (!project) throw new Error(`Project with id: ${id} does not exist`);

        return project;
    }
}
