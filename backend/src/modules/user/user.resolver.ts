import { FieldResolver, Resolver, Root } from "type-graphql";

import { User } from "../../entities/user.entity";
import { ProjectModel } from "../../entities/project.entity";

@Resolver(() => User)
export class UserResolver {
    @FieldResolver()
    async createdProjects(@Root() user: User) {
        // https://stackoverflow.com/questions/40140149/use-async-await-with-array-map
        return await Promise.all(
            user._doc.createdProjects.map(
                async (projectId: any) => await ProjectModel.findById(projectId)
            )
        );
    }
}
