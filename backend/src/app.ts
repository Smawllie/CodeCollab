import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import Session from "express-session";
import { createServer } from "http";
import { connect } from "mongoose";
import { buildSchema } from "type-graphql";

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
            // TODO: Add helmet and look at cors package
            // cookie: { httpOnly: true, secure: true, sameSite: true },
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
