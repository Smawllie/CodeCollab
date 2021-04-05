import { ApolloClient, InMemoryCache} from "@apollo/client";
import { onError } from '@apollo/client/link/error';


const client = new ApolloClient({
    // uri: "http://localhost:4000/graphql",
    // uri: "https://codecollab.me/graphql",

    uri: process.env.REACT_APP_APOLLO_SERVER_URI,
    cache: new InMemoryCache(),
    headers: {
        'client-name': 'code-collab',
        'client-version': '1.0.0'
      },
    credentials: "include",
});

export default client;
