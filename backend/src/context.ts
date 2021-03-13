import { Request, Response } from "express";
import Cookie from "cookie";

export const context = ({ req, res }: any) => {
    // Add the HTTP request from express to the context
    // This means it can be access from any resolver

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
};

export interface Context {
    req: Request & {
        session: {
            userId: String;
        };
    };

    res: Response;
}
