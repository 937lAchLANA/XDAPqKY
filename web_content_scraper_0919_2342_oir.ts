// 代码生成时间: 2025-09-19 23:42:06
import puppeteer from 'puppeteer';
import { ApolloServer, gql } from 'apollo-server';
import { buildSubgraphSchema } from '@apollo/subgraph';

// Define GraphQL schema
const typeDefs = gql`
  type Query {
    scrapeContent(url: String!): String
  }
`;

// Define resolvers
const resolvers = {
  Query: {
    scrapeContent: async (_, { url }) => {
      try {
        // Launch browser
        const browser = await puppeteer.launch({ headless: false });
        // Create a new page
        const page = await browser.newPage();
        // Navigate to the URL
        await page.goto(url, { waitUntil: 'networkidle0' });

        // Extract content from the page
        const content = await page.evaluate(() => document.body.innerHTML);

        // Close the browser
        await browser.close();

        return content;

      } catch (error) {
        // Handle any errors that occur during scraping
        console.error('Error scraping content:', error);
        throw new Error('Failed to scrape content from the provided URL');
      }
    },
  },
};

// Create Apollo Server instance
const server = new ApolloServer({
  schema: buildSubgraphSchema({
    typeDefs,
    resolvers,
  })
});

// Start the server
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});