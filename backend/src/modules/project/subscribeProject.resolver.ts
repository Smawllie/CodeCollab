import { MyArgs, SubscribeProjectInput } from "./input/testSubscribe.input";
import {
    Arg,
    Subscription,
    Resolver,
    Query,
    Mutation,
    PubSub,
    Root,
    ResolverFilterData,
    Publisher,
} from "type-graphql";
import { PubSubEngine } from "graphql-subscriptions";
import { Notification, NotificationPayload } from "./notification.type";

@Resolver()
export class SubscribeProjectResolver {
    @Mutation(() => Boolean)
    async pubSubMutation(
        @PubSub() pubSub: PubSubEngine,
        @Arg("project") { projectId, html, css, js }: SubscribeProjectInput
    ): Promise<boolean> {
        const payload: NotificationPayload = {
            projectId,
            html,
            css,
            js,
        };
        await pubSub.publish("NOTIFICATIONS", payload);
        return true;
    }

    // @Mutation(() => Boolean)
    // async publisherMutation(
    //     @PubSub("NOTIFICATIONS") publish: Publisher<NotificationPayload>,
    //     @Arg("message", { nullable: true }) message?: string
    // ): Promise<boolean> {
    //     await publish({ id: ++this.autoIncrement, message });
    //     return true;
    // }

    @Subscription({ topics: "NOTIFICATIONS" })
    normalSubscription(
        @Root() { projectId, html, css, js }: NotificationPayload
    ): Notification {
        return { projectId, html, css, js };
    }

    @Subscription(() => Notification, {
        topics: "NOTIFICATIONS",
        filter: ({ payload, args }: any) => {
            console.log(args);
            console.log("in filter func", args.test.myArg);
            return payload.projectId === args.test.myArg;
        },
    })
    subscriptionWithFilter(
        @Root() { projectId, html, css, js }: NotificationPayload,
        @Arg("test") args: MyArgs
    ) {
        console.log("filter", args);
        return { projectId, html, css, js };
    }

    // dynamic topic
    // @Mutation(() => Boolean)
    // async pubSubMutationToDynamicTopic(
    //     @PubSub() pubSub: PubSubEngine,
    //     @Arg("topic") topic: string,
    //     @Arg("message", { nullable: true }) message?: string
    // ): Promise<boolean> {
    //     const payload: NotificationPayload = {
    //         id: ++this.autoIncrement,
    //         message,
    //     };
    //     await pubSub.publish(topic, payload);
    //     return true;
    // }

    // @Subscription({
    //     topics: ({ args }) => args.topic,
    // })
    // subscriptionWithFilterToDynamicTopic(
    //     @Root() { id, message }: NotificationPayload
    // ): Notification {
    //     return { id, message, date: new Date() };
    // }
}
