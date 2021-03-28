import { Authorized, Ctx, Query, Resolver } from "type-graphql";

import { Context } from "../../context";

@Resolver()
export class SignOutResolver {
    @Query(() => Boolean)
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
