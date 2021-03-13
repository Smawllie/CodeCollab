import { AuthChecker } from "type-graphql";
import { Context } from "../../context";

export const customAuthChecker: AuthChecker<Context> = ({ context }) => {
    if (context.req.session.userId) return true;
    return false;
};
