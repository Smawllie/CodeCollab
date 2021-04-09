import { Arg, Authorized, Ctx, Query, Resolver } from "type-graphql";

import { User, UserModel } from "../../entities/user.entity";
import { Context } from "../../context";

@Resolver(() => User)
export class GetUserResolver {
    @Query(() => User, {
        description: "query to get user by id",
    })
    @Authorized()
    async getUserById(
        @Arg("id", { description: "id of user" })
        id: String
    ) {
        let user = await UserModel.findById(id).exec();

        if (!user) throw new Error(`User with id: ${id} does not exist`);

        return user;
    }

    @Query(() => User, {
        description: "query to get current user",
    })
    @Authorized()
    async getCurrentUser(@Ctx() context: Context) {
        let id = context.req.session.userId;

        let user = await UserModel.findById(id).exec();

        if (!user) throw new Error(`User with id: ${id} does not exist`);

        return user;
    }
}
