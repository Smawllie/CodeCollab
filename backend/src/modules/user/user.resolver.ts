import { Arg, FieldResolver, Query, Resolver, Root } from "type-graphql";

import { User, UserModel } from "../../entities/user.entity";
import { ProjectModel } from "../../entities/project.entity";

@Resolver(() => User)
export class UserResolver {
    @Query(() => User)
    // TODO: Check if id is alphanumeric and also do errors if user id not found
    // and authentication
    async userById(@Arg("id") id: String) {
        return await UserModel.findById(id);
    }

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
