import { ApolloServer } from '@apollo/server';
import { typeDefs } from './typedef.js';
import { resolvers }from './resolvers.js';
import { buildSubgraphSchema } from '@apollo/subgraph';

export const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
    introspection: true
    
});

