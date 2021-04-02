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

// TODO: Maybe this should be in an env file or something
const MONGO_DB_URL = "mongodb://localhost/codecollab-db";
const PORT = 4000;

const main = async () => {
    connect(MONGO_DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const app = Express();

    let corsOptions = {
        // TODO: Point this to the actual front end domain
        origin: "http://localhost:3000",
        credentials: true,
    };

    const sessionMiddleware = Session({
        // TODO: Move secret to env or something
        secret: "Change this secret later",
        resave: false,
        saveUninitialized: true,
        // TODO: Add helmet and look at cors package
        // cookie: { httpOnly: true, secure: true, sameSite: true },
    });

    app.use(sessionMiddleware);

    // app.use(cors());
    // const schema = await buildSchema({ resolvers });
    const schema = await buildSchema({ resolvers, authChecker });
    const apolloServer = new ApolloServer({
        schema,
        context,
        subscriptions: {
            path: "/subscriptions",
            onConnect: (connectionParams, webSocket: any, context) => {
                // console.log(connectionParams);
                const res = ({} as any) as Express.Response;
                console.log("Before", webSocket.upgradeReq.headers.cookie);
                console.log("Before", Object.keys(webSocket.upgradeReq));
                sessionMiddleware(webSocket.upgradeReq, res, () => {
                    console.log(Object.keys(webSocket.upgradeReq));
                    console.log(webSocket.upgradeReq.session);
                    console.log(webSocket.upgradeReq.sessionID);
                });
                console.log("Client connected test");
            },
            onDisconnect: (_webSocket, _context) => {
                console.log("Client disconnected test");
            },
        },
    });

    apolloServer.applyMiddleware({ app, cors: corsOptions });

    const server = createServer(app);
    apolloServer.installSubscriptionHandlers(server);

    server.listen(PORT, function () {
        console.log(`
            HTTP GraphQL server on http://localhost:${PORT}/graphql/
            Run queries at https://studio.apollographql.com/dev/
        `);
        console.log(
            `🚀 Subscriptions ready at ws://localhost:${PORT}${apolloServer.subscriptionsPath}`
        );
    });
};

main();
