// services/nftService.ts
import { request, gql } from 'graphql-request';

export interface NFTEntity {
  nftId: string;
  owner: string;
  creator: string;
  collectionId: string;
  offchainData: string;
}

export interface NFTResponse {
  nftEntities: {
    totalCount: number;
    nodes: NFTEntity[];
  };
}

const graphqlAPI = 'https://indexer-alphanet.ternoa.dev/';

export const getLastListedNFTs = async (): Promise<NFTEntity[]> => {
  const gqlQuery = gql`
    {
      nftEntities(first: 10, offset: 0, orderBy: [TIMESTAMP_CREATED_DESC]) {
        totalCount
        nodes {
          nftId
          owner
          creator
          collectionId
          offchainData
        }
      }
    }
  `;

  try {
    const response = await request<NFTResponse>(graphqlAPI, gqlQuery);
    return response.nftEntities.nodes;
  } catch (error) {
    console.error('Error fetching NFTs:', error);
    throw new Error('Error fetching NFTs');
  }
};
