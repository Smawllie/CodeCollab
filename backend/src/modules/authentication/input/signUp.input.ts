import { IsEmail } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType({ description: "Schema for signup" })
export class SignUpInput {
    @Field({ description: "email of user" })
    @IsEmail()
    email: string;

    @Field({ nullable: true, description: "username of user" })
    username: string;

    @Field({ description: "password of user" })
    password: string;

    @Field({ nullable: true, description: "first name of user" })
    firstName: string;

    @Field({ nullable: true, description: "last name of user" })
    lastName: string;
}
