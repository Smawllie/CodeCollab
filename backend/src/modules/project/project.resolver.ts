import { FieldResolver, Resolver, Root } from "type-graphql";

import { UserModel } from "../../entities/user.entity";
import { Project } from "../../entities/project.entity";
import { DirectoryModel } from "../../entities/directory.entity";

@Resolver(() => Project)
export class ProjectResolver {
    @FieldResolver()
    async owner(@Root() project: Project) {
        return await UserModel.findById(project._doc.owner);
    }

    @FieldResolver()
    async root(@Root() project: Project) {
        return await DirectoryModel.findById(project._doc.root);
    }
}
