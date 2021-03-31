import { Authorized, Ctx, Query, Resolver } from "type-graphql";
import { Context } from "../../context";

@Resolver()
export class CheckUserResolver {
    @Query(() => String)
    @Authorized()
    checkUser(@Ctx() context: Context): String{
        let userId = context.req.session.userId;
        return userId;
    }}
