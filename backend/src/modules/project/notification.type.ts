// import { getModelForClass, prop as Property, Ref } from "@typegoose/typegoose";

import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export class Notification {
    @Field()
    projectId: string;

    @Field()
    html: string;

    @Field()
    css: string;

    @Field()
    js: string;
}

export interface NotificationPayload {
    projectId: string;

    html: string;

    css: string;

    js: string;
}
