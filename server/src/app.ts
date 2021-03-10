import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import * as express from "express";
import { createServer } from "http";
import { connect } from "mongoose";
import { buildSchema } from "type-graphql";

import { resolvers } from "./resolvers";

const MONGO_DB_URL = "mongodb://localhost/codecollab-db";
const PORT = 4000;

const main = async () => {
    connect(MONGO_DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const schema = await buildSchema({ resolvers });

    const apolloServer = new ApolloServer({ schema });

    const app = express();

    apolloServer.applyMiddleware({ app });

    createServer(app).listen(PORT, function () {
        console.log(`
            HTTP GraphQL server on http://localhost:${PORT}/graphql/
            Run queries at https://studio.apollographql.com/dev/
        `);
    });
};

main();
