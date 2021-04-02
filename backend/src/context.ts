import { Request } from "express";

export const context = ({ req, res, connection }: any) => {
    if (connection) {
        // Subscription
        const token = connection.context.authorization || "";
        return { token };
    } else {
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
