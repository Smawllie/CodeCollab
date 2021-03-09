import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import * as express from "express";
import { buildSchema, Query, Resolver } from "type-graphql";
import * as http from "http";

const PORT = 4000;

@Resolver()
class HelloResolver {
    @Query(() => String)
    async hello() {
        return "Hello World!";
    }
}

const main = async () => {
    const schema = await buildSchema({
        resolvers: [HelloResolver],
    });

    const apolloServer = new ApolloServer({ schema });

    const app = express();

    apolloServer.applyMiddleware({ app });

    http.createServer(app).listen(PORT, function () {
        console.log(`
            HTTP GraphQL server on http://localhost:${PORT}/graphql/
            Run queries at https://studio.apollographql.com/dev/
        `);
    });
};

main();
