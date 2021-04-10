import { ApolloClient, InMemoryCache, split, HttpLink } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";

const httpLink = new HttpLink({
    uri: process.env.REACT_APP_APOLLO_SERVER_URI,
    credentials: "include",
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    headers: {
        "client-name": "code-collab",
        "client-version": "1.0.0",
    },
    credentials: "include",
});

export default client;
