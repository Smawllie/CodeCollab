import { AuthChecker } from "type-graphql";
import { Context } from "../../context";

// NOTE: I could add my own middleware (@UseMiddleware decorator) to check if a
// person can write to a file or project (just for future reference)
export const customAuthChecker: AuthChecker<Context> = ({ context }) => {
    // return true;
    console.log("customAuthChecker id", context.req.sessionID);
    console.log("customAuthChecker session", context.req.session);
    console.log("customAuthChecker", context.req.session.userId);
    if (context.req.session.userId) return true;
    return false;
};
