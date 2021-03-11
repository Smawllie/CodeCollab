import { IsEmail } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class SignUpInput {
    @Field()
    @IsEmail()
    email: string;

    @Field()
    username: string;

    @Field()
    password: string;

    @Field({ nullable: true })
    firstName: string;

    @Field({ nullable: true })
    lastName: string;
}
