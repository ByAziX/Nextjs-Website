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

const ipfsClient = new TernoaIPFS(new URL(process.env.IPFS_GATEWAY), process.env.IPFS_API_KEY);

// Fonction pour récupérer les métadonnées IPFS
const fetchIPFSMetadata = async (offchainData: string) => {
  try {
    const metadata = await ipfsClient.getFile(offchainData) as any;
    const mediaUrl = metadata?.properties?.media
      ? `${process.env.IPFS_GATEWAY}/ipfs/${metadata.properties.media.hash}`
      : '';
    return { metadata, mediaUrl };
  } catch (error) {
    console.error(`Error fetching metadata from IPFS:`, error);
    return { metadata: null, mediaUrl: '' };
  }
};

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
      const { metadata, mediaUrl } = await fetchIPFSMetadata(nft.offchainData);
      return { ...nft, metadata, mediaUrl };
    }));

    return nfts;
  } catch (error) {
    console.error('Error fetching NFTs:', error);
    throw new Error('Error fetching NFTs');
  }
};

export const getNftData = async (id: string): Promise<NFTEntity> => {
  const gqlQuery = gql`
    {
      nftEntity(id: "${id}") {
        owner
        nftId
        offchainData
        collectionId
        royalty
      }
    }
  `;

  try {
    const response = await request<{ nftEntity: NFTEntity }>(process.env.GRAPHQL_ENDPOINT, gqlQuery);
    const nft = response.nftEntity;
    const { metadata, mediaUrl } = await fetchIPFSMetadata(nft.offchainData);
    return { ...nft, metadata, mediaUrl };
  } catch (error) {
    console.error('Error fetching NFT:', error);
    throw new Error('Error fetching NFT');
  }
};
