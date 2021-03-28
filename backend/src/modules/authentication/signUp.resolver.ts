import { hash } from "bcrypt";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import Cookie from "cookie";

import { User, UserModel } from "../../entities/user.entity";
import { SignUpInput } from "./input/signUp.input";
import { Context } from "../../context";

@Resolver()
export class SignUpResolver {
    @Mutation(() => User)
    async signUp(
        @Arg("user")
        { email, username, password, firstName, lastName }: SignUpInput,
        @Ctx() context: Context
    ): Promise<User> {
        let user = await UserModel.findOne({ email }).exec();

        if (user) throw new Error(`User with email: ${email} exists already`);

        user = await UserModel.findOne({ username }).exec();

        if (user)
            throw new Error(`User with username: ${username} exists already`);

        let passwordHash = await hash(password, 10);

        user = new UserModel({
            email,
            username,
            passwordHash,
            firstName,
            lastName,
        });

        await user.save();

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
