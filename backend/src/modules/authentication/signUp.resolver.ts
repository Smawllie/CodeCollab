import { hash } from "bcrypt";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";

import { User, UserModel } from "../../entities/user.entity";
import { SignUpInput } from "./input/signUp.input";
import { Context } from "../../context";

@Resolver()
export class SignUpResolver {
    @Mutation(() => User, { description: "Mutation used for sign up" })
    async signUp(
        @Arg("user", { description: "Email and password for signup" })
        { email, password }: SignUpInput,
        @Ctx() context: Context
    ): Promise<User> {
        let user = await UserModel.findOne({ email }).exec();

        if (user) throw new Error(`User with email: ${email} exists already`);

        let passwordHash = await hash(password, 10);

        user = new UserModel({
            email,
            passwordHash,
        });

        await user.save();

        // Set session
        context.req.session.userId = user._id.toString();

        return user;
    }
}
