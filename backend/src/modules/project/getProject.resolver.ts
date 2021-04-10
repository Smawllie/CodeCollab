import { Types } from "mongoose";
import { Arg, Resolver, Query, Authorized } from "type-graphql";

import { Project, ProjectModel } from "../../entities/project.entity";

@Resolver()
export class GetProjectResolver {
    @Query(() => Project, { description: "Query to get project by its ID" })
    @Authorized()
    async getProjectById(
        @Arg("id", { description: "ID of project" }) id: String
    ) {
        if (!Types.ObjectId.isValid(id as string))
            throw new Error(`${id} is not a valid ID`);

        let project = await ProjectModel.findById(id).exec();

        if (!project) throw new Error(`Project with id: ${id} does not exist`);

        return project;
    }
}
