import { NonEmptyArray } from "type-graphql";
import { AuthenticationResolver } from "./modules/user/authentication";

export const resolvers: NonEmptyArray<Function> | NonEmptyArray<string> = [
    AuthenticationResolver,
];
