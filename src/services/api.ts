import { GraphQLClient } from 'graphql-request';

const BASE_URL = 'https://graphql.anilist.co/v2';

export async function request<T>(query: string, variables?: Record<string, any>): Promise<T> {
  const client = new GraphQLClient(BASE_URL);

  try {
    const response = await client.request<T>(query, variables);
 
    return response;
  } catch (error: any) {
    throw new Error('GraphQL Request Error: ' + (error.message || 'Unknown error occurred'));
  }
}
