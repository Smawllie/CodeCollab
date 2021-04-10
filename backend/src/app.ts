import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import Session from "express-session";
import { createServer } from "http";
import { connect } from "mongoose";
import { buildSchema } from "type-graphql";
import Helmet from "helmet";

import dotenv from "dotenv";
dotenv.config();

import { context } from "./context";
import { resolvers } from "./resolvers";
import { customAuthChecker as authChecker } from "./modules/authorization/authorization.decorator";
import { setupShareDB } from "./shareDB";

const MongoDBStore = require("connect-mongodb-session")(Session);

const main = async () => {
    connect(process.env.MONGO_DB_URL!, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const sessionStore = new MongoDBStore({
        uri: process.env.MONGO_DB_URL,
        collection: "sessions",
    });

    sessionStore.on("error", function (error: Error) {
        console.log(error);
    });

    const app = Express();

    // https://github.com/graphql/graphql-playground/issues/1283
    app.use(Helmet({ contentSecurityPolicy: false }));

    let corsOptions = {
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    };

    app.use(
        Session({
            secret: process.env.SESSION_SECRET!,
            resave: false,
            saveUninitialized: true,
            store: sessionStore,
            unset: "destroy",
            cookie: { httpOnly: true },
        })
    );

    const schema = await buildSchema({ resolvers, authChecker });
    const apolloServer = new ApolloServer({
        schema,
        context,
    });

    apolloServer.applyMiddleware({ app, cors: corsOptions });

    const server = createServer(app);

    server.listen(process.env.PORT, function () {
        console.log(`
            HTTP GraphQL server on http://localhost:${process.env.PORT}/graphql/
        `);
    });

    // Setup ShareDB
    setupShareDB(server);
};

main();
