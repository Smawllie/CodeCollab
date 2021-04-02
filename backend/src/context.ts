import { Request } from "express";

export const context = ({ req, res, connection }: any) => {
    if (connection) {
        // Subscription
        // console.log("context connection", req.session, connection);
        // const token = connection.context.authorization || "";
        return;
    } else {
        // console.log("context", req.session);
        return { req };
    }
};

export interface Context {
    req: Request & {
        session: {
            userId: String;
        };
    };
}
