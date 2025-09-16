// 代码生成时间: 2025-09-17 07:58:13
import { ApolloServer } from 'apollo-server';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';

// Create an instance of ApolloServer with type definitions and resolvers
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // Enable or disable playground in production
  playground: process.env.NODE_ENV === 'development',
  // Enable or disable introspection in production
  introspection: process.env.NODE_ENV !== 'production',
  // Error handling configuration
  formatError: (error) => {
    // Log the error to the console for debugging purposes
    console.error(error);
    // Return the error message without exposing sensitive details
    return {
      message: error.message,
      locations: error.locations,
      path: error.path,
    };
  },
});

// Start the server and listen on the specified port
server
  .listen({ port: 4000 })
  .then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });

// Define the schema using GraphQL schema language
// This should be in a separate file named 'schema.ts'
const typeDefs = gql"""
  type Query {
    // Example query
    echo(message: String): String
  }
""";

// Define the resolvers for the schema
// This should be in a separate file named 'resolvers.ts'
const resolvers = {
  Query: {
    echo: (parent, args, context, info) => {
      // Basic error handling for the example query
      if (!args.message) {
        throw new Error('Message is required!');
      }
      return args.message;
    },
  },
};
