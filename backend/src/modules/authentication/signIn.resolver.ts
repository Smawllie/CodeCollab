import { AuthenticationError } from "apollo-server-errors";
import { compare } from "bcrypt";
import Cookie from "cookie";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";

import { Context } from "../../context";
import { User, UserModel } from "../../entities/user.entity";
import { SignInInput } from "./input/signIn.input";

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

        // Set session cookie and cookie for frontend
        context.req.session.userId = user._id.toString();
        context.res.setHeader(
            "Set-Cookie",
            Cookie.serialize("userId", user._id.toString(), {
                path: "/",
                maxAge: 60 * 60 * 24 * 7, // 1 week in number of seconds
                // TODO: Figure out the security headers
                // secure : true,
                // sameSite: true
            })
        );

        return user;
    }
}
