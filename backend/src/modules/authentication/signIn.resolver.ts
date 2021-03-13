import { AuthenticationError } from "apollo-server-errors";
import { compare } from "bcrypt";
import { Context } from "../../context";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";

import { User, UserModel } from "../../entities/user.entity";
import { SignInInput } from "./input/signIn.input"

@Resolver()
export class SignInResolver {
    @Mutation(() => User)
    async signIn(
        @Arg("user")
        { email, password }: SignInInput,
        @Ctx() context: Context
    ): Promise<User> {
        let user = await UserModel.findOne({ email });

        if (!user) throw new AuthenticationError("Access Denied");

        let valid = await compare(password, user.passwordHash);

        if (!valid) throw new AuthenticationError("Access Denied");

        context.req.session.userId = user._id;

        return user;
    }
}
