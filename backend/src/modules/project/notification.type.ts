// import { getModelForClass, prop as Property, Ref } from "@typegoose/typegoose";

import { ObjectType, Field, ID } from "type-graphql";

@ObjectType({
    description: "notification containing project id and 3 files",
})
export class Notification {
    @Field({ description: "id of project" })
    projectId: string;

    @Field({ description: "html of project" })
    html: string;

    @Field({ description: "css of project" })
    css: string;

    @Field({ description: "js of project" })
    js: string;
}

export interface NotificationPayload {
    projectId: string;

    html: string;

    css: string;

    js: string;
}
