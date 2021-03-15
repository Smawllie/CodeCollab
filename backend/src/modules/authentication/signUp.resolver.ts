import { hash } from "bcrypt";
import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";

import { User, UserModel } from "../../entities/user.entity";
import { SignUpInput } from "./input/signUp.input";

@Resolver()
export class SignUpResolver {
    // TODO: Delete this when I have an actual query
    @Query(() => String)
    @Authorized()
    hello(): string {
        return "Hello World!";
    }

    @Mutation(() => User)
    async signUp(
        @Arg("user")
        { email, username, password, firstName, lastName }: SignUpInput
    ): Promise<User> {
        let passwordHash = await hash(password, 10);

        let user = new UserModel({
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
