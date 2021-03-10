import { AuthenticationError } from "apollo-server-errors";
import { compare, hash } from "bcrypt";
import { Context } from "../../context";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";

import { User, UserModel } from "../../entities/User";
import { LoginInput } from "./input/LoginInput";
import { RegisterInput } from "./input/RegisterInput";

@Resolver()
export class AuthenticationResolver {
    // TODO: Delete this when I have an actual query
    @Query(() => String)
    hello(): string {
        return "Hello World!";
    }

    @Mutation(() => User)
    async register(
        @Arg("user")
        { email, username, password, firstName, lastName }: RegisterInput
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

    @Mutation(() => User)
    async login(
        @Arg("user")
        { email, password }: LoginInput,
        @Ctx() context: Context
    ): Promise<User> {
        let user = await UserModel.findOne({ email });

        if (!user) throw new AuthenticationError("Access Denied");

        let valid = await compare(password, user.passwordHash);

        if (!valid) throw new AuthenticationError("Access Denied");

        context.req.session.user = user;

        return user;
    }
}
