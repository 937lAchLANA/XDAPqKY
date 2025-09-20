// 代码生成时间: 2025-09-20 10:25:43
 * integration_test_tool.ts
 * This file sets up a simple Apollo Server with a test schema and includes
 * an example of how to use Jest for integration testing.
 */

import { ApolloServer } from 'apollo-server';
import { gql } from 'apollo-server';
import { jest } from '@jest/globals';

// Define the type definitions for our GraphQL schema
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Define the resolvers for our GraphQL schema
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

// Set up the Apollo Server with the schema and resolvers
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start the server for integration testing
async function startApolloServer() {
  await server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
}

// Jest test suite for integration testing
describe('Integration Test', () => {
  beforeAll(async () => {
    await startApolloServer();
  });

  afterAll(async () => {
    await server.stop();
  });

  test('Should respond to hello query', async () => {
    const query = '{ hello }';
    const result = await server.executeOperation({
      query,
    });
    expect(result.data).toEqual({ hello: 'Hello world!' });
  });
});
