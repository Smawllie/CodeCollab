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
import { Project, ProjectModel } from "../../entities/project.entity";
import { SubscribeProjectInput } from "./input/subscribeProject.input";

@Resolver()
export class GetProjectResolver {
    @Query(() => Project)
    async getProjectById(@Arg("id") id: String) {
        let project = await ProjectModel.findById(id).exec();

        if (!project) throw new Error(`Project with id: ${id} does not exist`);

        return project;
    }

    @Subscription(() => Project, {
        topics: "PROJECTS",
        filter: ({ payload, args }: any) => {
            console.log(args);
            console.log("in filter func", args.projectId);
            return true;
            // return payload.projectId === args.projectId;
        },
    })
    subscriptionWithTheFilter(
        @Root() { _id, name, owner, html, css, js, collaborators }: Project,
        @Arg("test") projectId: String
    ) {
        // console.log("filter", name);
        return { _id };
    }
}
