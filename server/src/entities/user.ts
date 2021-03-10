import { getModelForClass, prop as Property } from "@typegoose/typegoose";
import { Field, ObjectType, ID } from "type-graphql";

@ObjectType()
export class User {
    @Field()
    @Property({ required: true, unique: true })
    email: string;

    @Field(() => ID)
    @Property({ required: true, unique: true })
    username: string;

    @Property({ required: true })
    passwordHash: string;

    @Field({ nullable: true })
    @Property()
    firstName: string;

    @Field({ nullable: true })
    @Property()
    lastName: string;
}

export const UserModel = getModelForClass(User);
