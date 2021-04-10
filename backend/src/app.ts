import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import Session from "express-session";
import { createServer } from "http";
import { connect } from "mongoose";
import { buildSchema } from "type-graphql";

import dotenv from "dotenv";
dotenv.config();

import ShareDB from "sharedb";
import { Server } from "ws";

import { context } from "./context";
import { resolvers } from "./resolvers";
import { customAuthChecker as authChecker } from "./modules/authorization/authorization.decorator";

const otText = require("ot-text");
const WebSocketJSONStream = require("websocket-json-stream");

const MongoDBStore = require("connect-mongodb-session")(Session);

ShareDB.types.map["json0"].registerSubtype(otText.type);
const shareDBMongo = require("sharedb-mongo")(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

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
        // TODO: Point this to the actual front end domain
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    };

    app.use(
        Session({
            // TODO: Move secret to env or something
            secret: "Change this secret later",
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
        // subscriptions: {
        //     path: "/subscriptions",
        //     onConnect: (connectionParams: any, webSocket: any, context) => {
        //         // console.log("connectionParams", connectionParams);
        //         console.log("Client connected");
        //         return { context, connectionParams };
        //     },
        //     onDisconnect: (_webSocket, _context) => {
        //         console.log("Client disconnected");
        //         return _context;
        //     },
        // },
    });

    apolloServer.applyMiddleware({ app, cors: corsOptions });

    const server = createServer(app);
    // apolloServer.installSubscriptionHandlers(server);

    server.listen(process.env.PORT, function () {
        console.log(`
            HTTP GraphQL server on http://localhost:${process.env.PORT}/graphql/
            Run queries at https://studio.apollographql.com/dev/
        `);
    });

    // Setup ShareDB
    const shareDB = new ShareDB({ db: shareDBMongo });
    const webSocketServer = new Server({ server });

    webSocketServer.on("connection", function (socket) {
        var stream = new WebSocketJSONStream(socket);
        shareDB.listen(stream);
    });
};

main();
