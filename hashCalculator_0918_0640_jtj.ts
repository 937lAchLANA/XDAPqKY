// 代码生成时间: 2025-09-18 06:40:52
 * The program uses the APOLLO framework for better structure and maintainability.
 */

import { ApolloServer } from 'apollo-server';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';

// Create an executable schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

// Initialize the ApolloServer with the schema
const server = new ApolloServer({
  schema,
  context: ({ req }) => ({
    headers: req.headers,
  })
});

// Start the server
server
  .listen({ port: 4000 })
  .then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });

/*
 * Resolvers
 * Defines the functions to handle GraphQL queries and mutations.
 */
import { hash, compare } from 'bcryptjs';

export const resolvers = {
  Query: {
    hashValue: async (_, { data }) => {
      try {
        const hash = await bcryptjs.hash(data, 10);
        return hash;
      } catch (error) {
        throw new Error("Failed to calculate hash value");
      }
    }
  },
  Mutation: {
    compareHashes: async (_, { data, hash }) => {
      try {
        const result = await bcryptjs.compare(data, hash);
        return result;
      } catch (error) {
        throw new Error("Failed to compare hashes");
      }
    }
  }
};

/*
 * Type Definitions
 * Defines the GraphQL schema using type definitions.
 */
export const typeDefs = gql"
  type Query {
    hashValue(data: String!): String
  }
  type Mutation {
    compareHashes(data: String!, hash: String!): Boolean
  }
";