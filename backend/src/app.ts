import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import Session from "express-session";
import { createServer } from "http";
import { connect } from "mongoose";
import { buildSchema } from "type-graphql";
// import { graphqlUploadExpress } from "graphql-upload";

import { context } from "./context";
import { resolvers } from "./resolvers";
import { customAuthChecker as authChecker } from "./modules/authorization/authorization.decorator";

const MONGO_DB_URL = "mongodb://localhost/codecollab-db";
const PORT = 4000;

const main = async () => {
    connect(MONGO_DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const app = Express();

    app.use(
        Session({
            // TODO: Move secret to env or something
            secret: "Change this secret later",
            resave: false,
            saveUninitialized: true,
            // TODO: Add helmet and look at cors package
            // cookie: { httpOnly: true, secure: true, sameSite: true },
        })
    );

    // app.use(graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 10 }));

    const schema = await buildSchema({ resolvers, authChecker });
    const apolloServer = new ApolloServer({ schema, context, uploads: false });
    apolloServer.applyMiddleware({ app });

    createServer(app).listen(PORT, function () {
        console.log(`
            HTTP GraphQL server on http://localhost:${PORT}/graphql/
            Run queries at https://studio.apollographql.com/dev/
        `);
    });
};

main();
