import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://codecollab.me/graphql",
    cache: new InMemoryCache(),
});

export default client;
