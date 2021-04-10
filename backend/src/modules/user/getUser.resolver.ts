import { Arg, Authorized, Ctx, Query, Resolver } from "type-graphql";
import { Types } from "mongoose";

import { User, UserModel } from "../../entities/user.entity";
import { Context } from "../../context";

@Resolver(() => User)
export class GetUserResolver {
    @Query(() => User, {
        description: "Query to get user by id",
    })
    @Authorized()
    async getUserById(
        @Arg("id", { description: "ID of user" })
        id: String
    ) {
        if (!Types.ObjectId.isValid(id as string))
            throw new Error(`${id} is not a valid ID`);

        let user = await UserModel.findById(id).exec();

        if (!user) throw new Error(`User with id: ${id} does not exist`);

        return user;
    }

    @Query(() => User, {
        description: "Query to get current logged in user",
    })
    @Authorized()
    async getCurrentUser(@Ctx() context: Context) {
        let id = context.req.session.userId;

        let user = await UserModel.findById(id).exec();

        if (!user) throw new Error(`User with id: ${id} does not exist`);

        return user;
    }
}
