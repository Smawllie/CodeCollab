import { hash } from "bcrypt";
import { Arg, Mutation, Resolver } from "type-graphql";

import { User, UserModel } from "../../entities/user.entity";
import { SignUpInput } from "./input/signUp.input";

@Resolver()
export class SignUpResolver {
    @Mutation(() => User)
    async signUp(
        @Arg("user")
        { email, username, password, firstName, lastName }: SignUpInput
    ): Promise<User> {
        return new Promise((resolve, reject) =>
            hash(password, 10, (err, passwordHash) => {
                if (err) reject(err);

                let user = new UserModel({
                    email,
                    username,
                    passwordHash,
                    firstName,
                    lastName,
                });

                user.save();

                resolve(user);
            })
        );
    }
}
