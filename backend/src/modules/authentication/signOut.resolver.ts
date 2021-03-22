import Cookie from "cookie";
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

                context.res.setHeader(
                    "Set-Cookie",
                    Cookie.serialize("userId", "", {
                        path: "/",
                        maxAge: 60 * 60 * 24 * 7, // 1 week in number of seconds
                        // TODO: Figure out the security headers
                        // secure: true,
                        // sameSite: true,
                    })
                );

                resolve(true);
            })
        );
    }
}
