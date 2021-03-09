import { Arg, Mutation, Query, Resolver } from "type-graphql";
import * as bcrypt from "bcrypt";

@Resolver()
export class RegisterResolver {
    @Query(() => String)
    async hello() {
        return "Hello World!";
    }

    @Mutation(() => String)
    async register(
        @Arg("email") email: string,
        // @Arg("firstName", { nullable: true }) firstName: string,
        // @Arg("lastName", { nullable: true }) lastName: string,
        // @Arg("username") username: string,
        @Arg("password") password: string
    ) {
        const hash = await bcrypt.hash(password, 10);
        return {email, hash};
    }
}
