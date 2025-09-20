// 代码生成时间: 2025-09-20 19:22:21
import { ApolloServer, gql } from 'apollo-server';
import { InMemoryLRUCache } from 'apollo-server-cache-inmemory';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { addMocksToSchema } from '@graphql-tools/mock';
import { IResolvers } from 'graphql-tools';

// 定义库存管理的类型
const typeDefs = gql"
  type InventoryItem {
    id: ID!
    name: String!
    quantity: Int!
    price: Float!
  }

  type Query {
    getInventoryItems: [InventoryItem]
    getInventoryItem(id: ID!): InventoryItem
  }

  type Mutation {
    addInventoryItem(name: String!, quantity: Int!, price: Float!): InventoryItem
    updateInventoryItem(id: ID!, name: String, quantity: Int, price: Float): InventoryItem
    removeInventoryItem(id: ID!): Boolean
  }
";

// 模拟库存数据
const inventoryItems: { [id: string]: any } = {
  '1': { id: '1', name: 'Item 1', quantity: 100, price: 19.99 },
  '2': { id: '2', name: 'Item 2', quantity: 200, price: 29.99 },
  // ... 更多库存项
};

// Resolvers定义
const resolvers: IResolvers = {
  Query: {
    getInventoryItems: () => Object.values(inventoryItems),
    getInventoryItem: (_, { id }) => inventoryItems[id] || null,
  },
  Mutation: {
    addInventoryItem: (_, { name, quantity, price }) => {
      const newId = String(Object.keys(inventoryItems).length + 1);
      inventoryItems[newId] = { id: newId, name, quantity, price };
      return inventoryItems[newId];
    },
    updateInventoryItem: (_, { id, name, quantity, price }) => {
      if (!inventoryItems[id]) {
        throw new Error('Inventory item not found');
      }
      inventoryItems[id] = {
        ...inventoryItems[id],
        name: name || inventoryItems[id].name,
        quantity: quantity !== undefined ? quantity : inventoryItems[id].quantity,
        price: price !== undefined ? price : inventoryItems[id].price,
      };
      return inventoryItems[id];
    },
    removeInventoryItem: (_, { id }) => {
      if (!inventoryItems[id]) {
        throw new Error('Inventory item not found');
      }
      delete inventoryItems[id];
      return true;
    },
  },
};

// 创建可执行的Schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// 为Schema添加Mock数据
const mockedSchema = addMocksToSchema({
  schema,
  mocks: {
    InventoryItem: () => ({
      id: 'mocked-id',
      name: 'Mocked Item',
      quantity: 150,
      price: 39.99,
    }),
  },
  preserveResolvers: true,
});

// 创建ApolloServer实例
const server = new ApolloServer({
  schema: mockedSchema,
  cache: new InMemoryLRUCache(),
  context: () => ({
    // 这里可以添加比如用户身份验证信息等上下文信息
  }),
  formatError: (error) => {
    // 错误处理，可以根据需要格式化错误信息
    console.error(error);
    return error;
  },
});

// 启动服务器
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

// 以上代码定义了一个简单的库存管理系统，包括增加、查询、更新和删除库存项的功能。
// 它使用ApolloServer和GraphQL来处理API请求，并提供了模拟数据和错误处理。
