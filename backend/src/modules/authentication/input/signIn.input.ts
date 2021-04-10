import { IsEmail } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType({ description: "Input type for signing in" })
export class SignInInput {
    @Field({ description: "Email of user" })
    @IsEmail()
    email: string;

    @Field({ description: "Password of user" })
    password: string;
}
