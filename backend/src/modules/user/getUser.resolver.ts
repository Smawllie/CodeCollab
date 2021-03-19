import { Arg, Authorized, Query, Resolver } from "type-graphql";

import { User, UserModel } from "../../entities/user.entity";

@Resolver(() => User)
export class GetUserResolver {
    @Query(() => User)
    @Authorized()
    async getUserById(@Arg("user") { id }: String) {
        let user = await UserModel.findById(id).exec();

        if (!user) throw new Error(`User with id: ${id} does not exist`);

        return user;
    }
}
