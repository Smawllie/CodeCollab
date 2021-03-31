import { Request, Response } from "express";
import Cookie from "cookie";

export const context = ({ req, res, connection }: any) => {
    if (connection) {
        // Subscription
        const token = connection.context.authorization || "";
        return { token };
    } else {
        // Query or Mutation

        // Set readable cookie for frontend usage
        let userId = req.session.userId ? req.session.userId : "";

        res.setHeader(
            "Set-Cookie",
            Cookie.serialize("userId", userId, {
                path: "/",
                maxAge: 60 * 60 * 24 * 7, // 1 week in number of seconds
                // TODO: Figure out the security headers
                // secure : true,
                // sameSite: true
            })
        );

        return { req, res };
    }
};

export interface Context {
    req: Request & {
        session: {
            userId: String;
        };
    };

    res: Response;
}
