import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import * as express from "express";
import { buildSchema } from "type-graphql";
import * as http from "http";
import { RegisterResolver } from "./modules/user/register";

const PORT = 4000;

const main = async () => {
    const schema = await buildSchema({
        resolvers: [RegisterResolver],
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
