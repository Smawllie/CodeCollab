import { NonEmptyArray } from "type-graphql";
import { AuthenticationResolver } from "./modules/user/AuthenticationResolver";

export const resolvers: NonEmptyArray<Function> | NonEmptyArray<string> = [
    AuthenticationResolver,
];
