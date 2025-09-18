// 代码生成时间: 2025-09-19 06:58:16
import { ApolloServer, gql } from 'apollo-server';
import { readFileSync } from 'fs';
import { join } from 'path';
import sharp from 'sharp';

// 定义GraphQL Schema
const typeDefs = gql`
# 添加错误处理
  type Query {
    resizeImages(filePath: String!, width: Int!, height: Int!): [String]
  }
`;

// 定义Resolvers
const resolvers = {
  Query: {
    resizeImages: async (_, { filePath, width, height }) => {
      try {
        // 读取目录中的所有图片文件
        const files = readFileSync(filePath)
          .toString()
# 增强安全性
          .split('
')
          .filter(file => file.endsWith('.jpg') || file.endsWith('.png'));

        // 批量调整图片尺寸并返回新文件路径列表
        const resizedFiles = [];
# 改进用户体验
        for (const file of files) {
          const inputPath = join(filePath, file);
# NOTE: 重要实现细节
          const outputPath = `${inputPath}_resized`;
          await sharp(inputPath)
            .resize({ width, height })
            .toFile(outputPath);
          resizedFiles.push(outputPath);
        }
        return resizedFiles;
      } catch (error) {
        // 错误处理
        console.error('Error resizing images:', error);
# 增强安全性
        throw new Error('Failed to resize images');
      }
    },
  },
};

// 创建Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
# 改进用户体验
  context: () => ({
# 扩展功能模块
    // 可以在这里添加上下文信息，例如数据库连接等
  }),
});

// 启动服务器
# 添加错误处理
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});