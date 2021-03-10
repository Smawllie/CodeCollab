import { hash } from "bcrypt";
import { Arg, Mutation, Query, Resolver } from "type-graphql";

import { User, UserModel } from "../../entities/user";

@Resolver()
export class AuthenticationResolver {
    // Delete this when I have an actual query
    @Query(() => String)
    hello(): string {
        return "Hello World!";
    }

    @Mutation(() => User)
    async register(
        @Arg("email") email: string,
        @Arg("username") username: string,
        @Arg("password") password: string,
        @Arg("firstName", { nullable: true }) firstName: string,
        @Arg("lastName", { nullable: true }) lastName: string
    ): Promise<User> {
        // TODO: Check if username/email are taken
        const passwordHash = await hash(password, 10);

        const user = new UserModel({
            email,
            username,
            passwordHash,
            firstName,
            lastName,
        });

        await user.save();

        return user;
    }
}
