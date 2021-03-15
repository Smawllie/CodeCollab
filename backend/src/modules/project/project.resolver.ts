import { FieldResolver, Resolver, Root } from "type-graphql";

import { UserModel } from "../../entities/user.entity";
import { Project } from "../../entities/project.entity";

@Resolver(() => Project)
export class ProjectResolver {
    @FieldResolver()
    async owner(@Root() project: Project) {
        return await UserModel.findById(project._doc.owner);
    }
}
