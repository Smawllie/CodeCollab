import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    // https://api.codecollab.me. Make uri an environment variable
    // uri: "http://localhost:4000/graphql",
    uri: process.env.REACT_APP_GRAPHQL_SERVER,
    cache: new InMemoryCache(),
});

export default client;
