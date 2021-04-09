import { IsEmail } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType({ description: "Schema for signin" })
export class SignInInput {
    @Field({ description: "email of user" })
    @IsEmail()
    email: string;

    @Field({ description: "password of user" })
    password: string;
}
