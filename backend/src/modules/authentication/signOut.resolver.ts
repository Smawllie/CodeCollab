import { Authorized, Ctx, Mutation, Resolver } from "type-graphql";

import { Context } from "../../context";

@Resolver()
export class SignOutResolver {
    @Mutation(() => Boolean, { description: "Mutation used for sign out" })
    @Authorized()
    async signOut(@Ctx() context: Context): Promise<Boolean> {
        return new Promise((resolve, reject) =>
            context.req.session.destroy((err) => {
                if (err) reject(err);

                resolve(true);
            })
        );
    }
}
