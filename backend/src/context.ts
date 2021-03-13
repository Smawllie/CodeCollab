import { Request } from "express";
import { Types } from "mongoose";

export const context = ({ req }: any) => {
    // Add the HTTP request from express to the context
    // This means it can be access from any resolver
    return { req };
};

export interface Context {
    req: Request & {
        session: {
            userId: Types.ObjectId;
        };
    };
}
