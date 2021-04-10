import { AuthenticationError } from "apollo-server-errors";
import { compare } from "bcrypt";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";

import { Context } from "../../context";
import { User, UserModel } from "../../entities/user.entity";
import { SignInInput } from "./input/signIn.input";

@Resolver()
export class SignInResolver {
    @Mutation(() => User, { description: "Mutation used to sign in" })
    async signIn(
        @Arg("user", { description: "email and password of user" })
        { email, password }: SignInInput,
        @Ctx() context: Context
    ): Promise<User> {
        let user = await UserModel.findOne({ email });

        if (!user) throw new AuthenticationError("Access Denied");

        let valid = await compare(password, user.passwordHash);

        if (!valid) throw new AuthenticationError("Access Denied");

        // Set session cookie and cookie for frontend
        context.req.session.userId = user._id.toString();

        return user;
    }
}
