import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    // uri: "http://localhost:4000/graphql",
    // uri: "https://codecollab.me/graphql",
    uri: process.env.REACT_APP_APOLLO_SERVER_URI,
    cache: new InMemoryCache(),
    credentials: "include",
});

export default client;
