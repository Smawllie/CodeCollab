import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    // uri: "https://codecollab.me/graphql",
    uri: process.env.REACT_APP_APOLLO_SERVER_URI,
    cache: new InMemoryCache(),
});

export default client;
