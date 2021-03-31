import { hash } from "bcrypt";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";

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

        // Set session cookie
        context.req.session.userId = user._id.toString();

        return user;
    }
}
