// import { getModelForClass, prop as Property, Ref } from "@typegoose/typegoose";

import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export class Notification {
    @Field(() => ID)
    id: number;

    @Field({ nullable: true })
    message?: string;

    @Field(() => Date)
    date: Date;
}

@ObjectType()
export class Test {
    @Field(() => ID)
    test: number;
}

export interface NotificationPayload {
    id: number;
    message?: string;
}
