import { hash } from "bcrypt";
import { Arg, Mutation, Query, Resolver } from "type-graphql";

import { User, UserModel } from "../../entities/User";
import { RegisterInput } from "./input/RegisterInput";

@Resolver()
export class AuthenticationResolver {
    // Delete this when I have an actual query
    @Query(() => String)
    hello(): string {
        return "Hello World!";
    }

    @Mutation(() => User)
    async register(
        @Arg("user")
        { email, username, password, firstName, lastName }: RegisterInput
    ): Promise<User> {
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
