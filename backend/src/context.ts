import { Request } from "express";

export const context = ({ req }: any) => {
    return { req };
};

export interface Context {
    req: Request & {
        session: {
            userId: String;
        };
    };
}
