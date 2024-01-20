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

// Initialisez l'instance TernoaIPFS avec l'URL de la passerelle IPFS et la clé API
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

// Fonction pour récupérer la liste des NFTs avec pagination
export const getLastListedNFTs = async (limit = 10, offset = 0): Promise<{ nfts: NFTEntity[], totalCount: number }> => {
  const gqlQuery = gql`
    query GetNFTs($first: Int!, $offset: Int!) {
      nftEntities(first: $first, offset: $offset, orderBy: [TIMESTAMP_CREATED_DESC]) {
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
    const response = await request<NFTResponse>(process.env.GRAPHQL_ENDPOINT, gqlQuery, {
      first: limit,
      offset: offset
    });

    const nfts = await Promise.all(response.nftEntities.nodes.map(async (nft) => {
      const { metadata, mediaUrl } = await fetchIPFSMetadata(nft.offchainData);
      return { ...nft, metadata, mediaUrl };
    }));

    return { nfts, totalCount: response.nftEntities.totalCount };
  } catch (error) {
    console.error('Error fetching NFTs:', error);
    throw new Error('Error fetching NFTs');
  }
};

// Fonction pour récupérer les données d'un NFT spécifique par son ID
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
