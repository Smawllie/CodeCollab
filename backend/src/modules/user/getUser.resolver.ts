import { Arg, Query, Resolver } from "type-graphql";

import { User, UserModel } from "../../entities/user.entity";

@Resolver(() => User)
export class GetUserResolver {
    @Query(() => User)
    // TODO: Check if id is alphanumeric and also do errors if user id not found
    // and authentication
    async getUserById(@Arg("id") id: String) {
        return new Promise((res, _) =>
            UserModel.findById(id, (err: any, user: User) => {
                if (err) throw new Error();

                if (!user)
                    throw new Error(`User with id: ${id} does not exist`);

                res(user);
            })
        );
    }
}
