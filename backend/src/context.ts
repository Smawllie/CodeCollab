import { Request } from "express";

import { User } from "./entities/user.entity";

export const context = ({ req }: any) => {
    // Add the HTTP request from express to the context
    // This means it can be access from any resolver
    return { req };
};

export interface Context {
    req: Request & {
        session: {
            user: User;
        };
    };
}
