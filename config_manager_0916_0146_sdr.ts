// 代码生成时间: 2025-09-16 01:46:55
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { createUploadLink } from 'apollo-upload-client';

// 使用 ApolloClient 配置文件
const client = new ApolloClient({
  link: createUploadLink({
    uri: 'http://localhost:4000/graphql', // 服务端地址
    headers: {
      'content-type': 'application/json',
    },
    onError: (error: any) => {
      console.error(error);
    },
  }),
  cache: new InMemoryCache(),
});

// GraphQL 查询语句
const GET_CONFIG_QUERY = gql`
  query GetConfig($configId: ID!) {
    config(id: $configId) {
      id
      value
    }
  }
`;

// 配置文件管理器类
class ConfigManager {
  private apolloClient: ApolloClient<any>;

  constructor() {
    this.apolloClient = client;
  }

  // 获取配置项
  public async getConfig(configId: string): Promise<any> {
    try {
      const { data } = await this.apolloClient.query({
        query: GET_CONFIG_QUERY,
        variables: { configId },
      });

      return data.config;
    } catch (error) {
      console.error('Failed to retrieve config:', error);
      throw new Error('Failed to retrieve config');
    }
  }

  // 更新配置项
  public async updateConfig(configId: string, newValue: string): Promise<any> {
    try {
      const UPDATE_CONFIG_MUTATION = gql`
        mutation UpdateConfig($configId: ID!, $newValue: String!) {
          updateConfig(id: $configId, value: $newValue) {
            id
            value
          }
        }
      `;

      const { data } = await this.apolloClient.mutate({
        mutation: UPDATE_CONFIG_MUTATION,
        variables: { configId, newValue },
      });

      return data.updateConfig;
    } catch (error) {
      console.error('Failed to update config:', error);
      throw new Error('Failed to update config');
    }
  }
}

// 示例用法
const configManager = new ConfigManager();

// 获取配置项
configManager.getConfig('123').then(config => {
  console.log('Config:', config);
}).catch(error => {
  console.error(error);
});

// 更新配置项
configManager.updateConfig('123', 'new value').then(config => {
  console.log('Updated Config:', config);
}).catch(error => {
  console.error(error);
});