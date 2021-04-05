import { Request } from "express";

export const context = ({ req }: any) => {
    // Add the HTTP request from express to the context
    // This means it can be access from any resolver

    return { req };
};

export interface Context {
    req: Request & {
        session: {
            userId: String;
        };
    };
}
