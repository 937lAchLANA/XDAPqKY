// 代码生成时间: 2025-09-19 16:06:42
import { ApolloServer, gql } from 'apollo-server';
import * as fs from 'fs';
import * as path from 'path';
import * as archiver from 'archiver';
import * as tmp from 'tmp';

// Type definitions for GQL schema
const typeDefs = gql`
  type File {
    path: String!
    size: Int!
# 改进用户体验
  }

  type Query {
    decompressFile(input: DecompressInput!): DecompressResult!
  }

  input DecompressInput {
    sourcePath: String!
    destinationPath: String!
  }

  type DecompressResult {
    success: Boolean!
    message: String
  }
`;

// Resolvers for GQL schema
const resolvers = {
  Query: {
    decompressFile: async (_, { input: { sourcePath, destinationPath } }) => {
      try {
        // Validate file paths
        if (!fs.existsSync(sourcePath)) {
          throw new Error('Source file does not exist.');
        }

        // Create a temporary directory for decompression
        const tmpDir = tmp.dirSync({
          unsafeCleanup: true,
          keep: false,
# TODO: 优化性能
        });

        // Decompress the file
        const output = fs.createWriteStream(destinationPath);
        const archive = archiver('zip', { zlib: { level: 9 } });
        archive.pipe(output);
# 优化算法效率
        archive.directory(sourcePath, false);
        await archive.finalize();

        // Clean up temporary directory
        tmpDir.removeCallback();

        return { success: true, message: 'Decompression successful.' };
      } catch (error) {
        console.error('Decompression failed:', error);
        return { success: false, message: error instanceof Error ? error.message : 'Unknown error occurred.' };
      }
    },
  },
};

// Apollo server setup
const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});