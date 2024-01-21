// nftService.tsx
import { request, gql } from 'graphql-request';
import { TernoaIPFS } from 'ternoa-js';
import redisClient from './redisClient'; // Importation du client Redis
import {NFTEntity, NFTResponse } from '../components/interfaces'

const ipfsClient = new TernoaIPFS(new URL(process.env.IPFS_GATEWAY), process.env.IPFS_API_KEY);

// Fonction pour récupérer les métadonnées IPFS
const fetchIPFSMetadata = async (offchainData: string): Promise<{ metadata: any; mediaUrl: string }> => {
  const defaultImageHash = "QmNsqeXwMtpfpHTtCJHMMWp924HrGL85AnVjEEmDHyUkBg";

  const cacheKey = `ipfs:${offchainData}`;
  const cachedData = await redisClient.get(cacheKey);

  if (cachedData) {
    return JSON.parse(cachedData);
  }


  try {
    const metadata = await ipfsClient.getFile(offchainData) as any;
    const mediaUrl = metadata?.properties?.media && metadata.properties.media.hash 
      ? `${process.env.IPFS_GATEWAY}/ipfs/${metadata.properties.media.hash}`
      : `${process.env.IPFS_GATEWAY}/ipfs/${defaultImageHash}`;

    await redisClient.set(cacheKey, JSON.stringify({ metadata, mediaUrl }), { EX: 10000 });

    return { metadata, mediaUrl };
  } catch (error) {
    console.error(`Error fetching metadata from IPFS:`, error);
    return { metadata: null, mediaUrl: `${process.env.IPFS_GATEWAY}/ipfs/${defaultImageHash}` };
  }
};

// Fonction pour récupérer la liste des NFTs avec pagination
export const getLastListedNFTs = async (limit = 10, offset = 0): Promise<{ nfts: NFTEntity[], totalCount: number }> => {
  const cacheKey = `nfts:${limit}:${offset}`;
    const cachedData = await redisClient.get(cacheKey);
    
    if (cachedData) {
      return JSON.parse(cachedData);
    }
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
          priceRounded
          typeOfListing
          isListed
          collection {
            collectionId
          }
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

    await redisClient.set(cacheKey, JSON.stringify({ nfts, totalCount: response.nftEntities.totalCount }), { EX: 10 });

    return { nfts, totalCount: response.nftEntities.totalCount };
  } catch (error) {
    console.error('Error fetching NFTs:', error);
    throw new Error('Error fetching NFTs');
  }
};

// Fonction pour récupérer les données d'un NFT spécifique par son ID
export const getNftData = async (id: string): Promise<NFTEntity> => {
  const cacheKey = `nft:${id}`;
  const cachedData = await redisClient.get(cacheKey);

  if (cachedData) {
    return JSON.parse(cachedData);
  }

  const gqlQuery = gql`
    {
      nftEntity(id: "${id}") {
        owner
        creator
        nftId
        offchainData
        collectionId
        royalty
        priceRounded
        typeOfListing
        isListed
        collection {
          collectionId
        }
      }
    }
  `;

  try {
    const response = await request<{ nftEntity: NFTEntity }>(process.env.GRAPHQL_ENDPOINT, gqlQuery);
    const nft = response.nftEntity;
    const { metadata, mediaUrl } = await fetchIPFSMetadata(nft.offchainData);

    await redisClient.set(cacheKey, JSON.stringify({ ...nft, metadata, mediaUrl }), { EX: 3600 });

    return { ...nft, metadata, mediaUrl };
  } catch (error) {
    console.error('Error fetching NFT:', error);
    throw new Error('Error fetching NFT');
  }
};

export const getNFTfromOwner = async (owner: string, limit = 10, offset = 0): Promise<{ nfts: NFTEntity[], totalCount: number }> => {
  const cacheKey = `ownerNFTs:${owner}:${limit}:${offset}`;
  const cachedData = await redisClient.get(cacheKey);
  
  if (cachedData) {
    return JSON.parse(cachedData);
  }

  const gqlQuery = gql`
  query GetNFTsFromOwner($owner: String!, $limit: Int!, $offset: Int!) {
    nftEntities(
      filter: {
        owner: { equalTo: $owner }
      },
      first: $limit,
      offset: $offset
    ) {
      totalCount
      aggregates {
        sum {
          priceRounded
        }
      }
      nodes {
        nftId
        owner
        creator
        collectionId
        offchainData
        priceRounded
        typeOfListing
        isListed
        collection {
          collectionId
          owner
          offchainData
          nfts
          nbNfts
          limit
          hasReachedLimit
          isClosed
          timestampCreated
          timestampBurned
          timestampClosed
          timestampLimited

        }
      }
    }
  }
  `;

  try {
    const variables = {
      owner: owner,
      limit: limit,
      offset: offset
    };

    const response = await request<NFTResponse>(process.env.GRAPHQL_ENDPOINT, gqlQuery, variables);

    const nfts = await Promise.all(response.nftEntities.nodes.map(async (nft) => {
      const { metadata, mediaUrl } = await fetchIPFSMetadata(nft.offchainData);
      return { ...nft, metadata, mediaUrl };
    }));

    await redisClient.set(cacheKey, JSON.stringify({ nfts, totalCount: response.nftEntities.totalCount }), { EX: 3600 });

    return { nfts, totalCount: response.nftEntities.totalCount };
  } catch (error) {
    console.error('Error fetching NFTs:', error);
    throw new Error('Error fetching NFTs');
  }
};
