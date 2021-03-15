import { FieldResolver, Resolver, Root } from "type-graphql";

import { Resource } from "../../entities/resource.entity";
import { DirectoryModel } from "../../entities/directory.entity";
import { ProjectModel } from "../../entities/project.entity";

@Resolver(() => Resource)
export class ResourceResolver {
    @FieldResolver()
    async project(@Root() resource: Resource) {
        return await ProjectModel.findById(resource._doc.project);
    }

    @FieldResolver()
    async parent(@Root() resource: Resource) {
        return await DirectoryModel.findById(resource._doc.parent);
    }
}
