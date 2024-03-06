import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";

// Remplacez 'your-graphql-endpoint' par votre endpoint GraphQL réel
const httpLink = new HttpLink({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
});

const client = new ApolloClient({
    link: from([httpLink]),
    cache: new InMemoryCache(),
});

export default client;