import { Arg, Query, Resolver } from "type-graphql";

import { Project, ProjectModel } from "../../entities/project.entity";

@Resolver()
export class GetProjectResolver {
    @Query(() => Project)
    async getProjectById(@Arg("id") id: String) {
        let project = ProjectModel.findById(id);

        if (!project) throw new Error(`Project with id: ${id} does not exist`);

        return project;
    }
}
