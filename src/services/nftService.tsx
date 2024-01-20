// services/nftService.ts
import { request, gql } from 'graphql-request';
import { TernoaIPFS } from 'ternoa-js';

export interface NFTEntity {
  nftId: string;
  owner: string;
  creator: string;
  collectionId: string;
  offchainData: string;
  metadata?: any;
  mediaUrl: string;
}

export interface NFTResponse {
  nftEntities: {
    totalCount: number;
    nodes: NFTEntity[];
  };
}

const ipfsGateway = 'https://ipfs-dev.trnnfr.com'; // Use the appropriate IPFS gateway

const ipfsClient = new TernoaIPFS(new URL(process.env.IPFS_GATEWAY), process.env.IPFS_API_KEY);

export const getLastListedNFTs = async (): Promise<NFTEntity[]> => {
  const gqlQuery = gql`
    {
      nftEntities(first: 100, offset: 0, orderBy: [TIMESTAMP_CREATED_DESC]) {
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
    const response = await request<NFTResponse>(process.env.GRAPHQL_ENDPOINT, gqlQuery);
    const nfts = await Promise.all(response.nftEntities.nodes.map(async (nft) => {
      try {
        const metadata = await ipfsClient.getFile(nft.offchainData) as any;

        const mediaUrl = metadata && metadata.properties && metadata.properties.media
          ? `${process.env.IPFS_GATEWAY}/ipfs/${metadata.properties.media.hash}`
          : '';

        return {
          ...nft,
          metadata: metadata,
          mediaUrl: mediaUrl 
        };
      } catch (error) {
        console.error(`Error fetching metadata for NFT ${nft.nftId}:`, error);
        return { ...nft, metadata: null, media: '' };
      }
    }));

    return nfts;
  } catch (error) {
    console.error('Error fetching NFTs:', error);
    throw new Error('Error fetching NFTs');
  }
};

