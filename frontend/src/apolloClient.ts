import { ApolloClient, InMemoryCache, split, HttpLink } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";

const httpLink = new HttpLink({
    // uri: "http://localhost:4000/graphql",
    // uri: "https://codecollab.me/graphql",
    uri: process.env.REACT_APP_APOLLO_SERVER_URI,
    credentials: "include",
});

const wsLink = new WebSocketLink({
    // uri: "ws://localhost:4000/subscriptions",
    uri: process.env.REACT_APP_APOLLO_SERVER_SUBSCRIPTION!,
    options: {
        reconnect: true,
    },
});

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
// Code snippet from: https://www.apollographql.com/docs/react/data/subscriptions/
const splitLink = split(
    ({ query }) => {
        console.log("split", query);
        const definition = getMainDefinition(query);
        console.log("split definition", definition);
        return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
        );
    },
    wsLink,
    httpLink
);

const client = new ApolloClient({
    // uri: process.env.REACT_APP_APOLLO_SERVER_URI,
    link: splitLink,
    cache: new InMemoryCache(),
    headers: {
        "client-name": "code-collab",
        "client-version": "1.0.0",
    },
    credentials: "include",
});

export default client;
