import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

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
