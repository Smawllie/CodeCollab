import { IsEmail } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType({ description: "Schema for signup" })
export class SignUpInput {
    @Field({ description: "email of user" })
    @IsEmail()
    email: string;

    @Field()
    password: string;
}
