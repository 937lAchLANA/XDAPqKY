// 代码生成时间: 2025-10-10 18:53:38
import { ApolloServer, gql } from 'apollo-server';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { stitchingDirectives } from '@graphql-tools/stitching-directives';

// Define types
interface Subtitle {
  id: string;
  text: string;
  startTime: number;
  endTime: number;
}

// Define a mock data source for subtitles
const subtitles: Subtitle[] = [
  { id: '1', text: 'Hello, world!', startTime: 0, endTime: 5 },
  { id: '2', text: 'This is a subtitle generator tool.', startTime: 6, endTime: 10 },
  // Add more subtitles as needed
];

// Define the GraphQL schema
const typeDefs = gql\`
  type Subtitle {
    id: ID!
    text: String!
    startTime: Int!
    endTime: Int!
  }

  type Query {
    getSubtitles: [Subtitle]
  }
\`;

// Define the resolvers
const resolvers = {
  Query: {
    getSubtitles: () => subtitles,
  },
  Subtitle: {
    id: (subtitle) => subtitle.id,
    text: (subtitle) => subtitle.text,
    startTime: (subtitle) => subtitle.startTime,
    endTime: (subtitle) => subtitle.endTime,
  },
};

// Create an Apollo Server instance
const server = new ApolloServer({
  schema: makeExecutableSchema({
    typeDefs,
    resolvers,
  })
    // Add stitching directives to enable federated schema
    .addDirectiveResolvers(stitchingDirectives()),
});

// Start the server
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

// Error handling
server.listen().catch((error) => {
  console.error('Failed to start the server:', error);
});
