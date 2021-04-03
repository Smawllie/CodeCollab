import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import Session from "express-session";
import { createServer } from "http";
import { connect } from "mongoose";
import { buildSchema } from "type-graphql";

import { context } from "./context";
import { resolvers } from "./resolvers";
import { customAuthChecker as authChecker } from "./modules/authorization/authorization.decorator";
import { setupSocketIO } from "./setupSocketIO";

const MongoDBStore = require('connect-mongodb-session')(Session);
// TODO: Maybe this should be in an env file or something
const MONGO_DB_URL = "mongodb://localhost/codecollab-db";
const PORT = 4000;

const main = async () => {
    connect(MONGO_DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const sessionStore = new MongoDBStore({
        uri: MONGO_DB_URL,
        collection: 'sessions'
    });
    sessionStore.on("error",function(error: Error){
        console.log(error);
    });

    const app = Express();

    let corsOptions = {
        // TODO: Point this to the actual front end domain
        origin: "http://localhost:3000",
        credentials: true,
    };

    app.use(
        Session({
            // TODO: Move secret to env or something
            secret: "Change this secret later",
            resave: false,
            saveUninitialized: true,
            store:sessionStore,
            unset:'destroy'
            // TODO: Add helmet and look at cors package
            // cookie: { httpOnly: true, secure: true, sameSite: true },
        })
    );

    const schema = await buildSchema({ resolvers, authChecker });
    const apolloServer = new ApolloServer({ schema, context });
    apolloServer.applyMiddleware({ app, cors: corsOptions });

    let server = createServer(app);

    // Setup socket.io
    setupSocketIO(server);

    server.listen(PORT, function () {
        console.log(`
            HTTP GraphQL server on http://localhost:${PORT}/graphql/
            Run queries at https://studio.apollographql.com/dev/
        `);
    });
};

main();
