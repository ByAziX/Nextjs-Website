// nftService.tsx
import { request, gql } from 'graphql-request';
import { TernoaIPFS } from 'ternoa-js';
import cache from './redisClient'; // Utilisez le client de cache amélioré
import { CollectionEntity, CollectionResponse, NFTEntity, NFTResponse } from '../components/interfaces';

// Initialisez le client IPFS avec vos paramètres d'environnement
const ipfsClient = new TernoaIPFS(new URL(process.env.IPFS_GATEWAY!), process.env.IPFS_API_KEY);

// Fonction pour récupérer les métadonnées IPFS
const fetchIPFSMetadata = async (offchainData: string): Promise<{ metadata: any; mediaUrl: string }> => {
  const defaultImageHash = "QmNsqeXwMtpfpHTtCJHMMWp924HrGL85AnVjEEmDHyUkBg";
  const cacheKey = `ipfs:${offchainData}`;
  const cachedData = await cache.get(cacheKey);

  if (cachedData) {
    return JSON.parse(cachedData);
  }

  try {
    const metadata = await ipfsClient.getFile(offchainData) as any;
    const mediaUrl = metadata?.properties?.media && metadata.properties.media.hash 
      ? `${process.env.IPFS_GATEWAY}/ipfs/${metadata.properties.media.hash}`
      : `${process.env.IPFS_GATEWAY}/ipfs/${defaultImageHash}`;

    await cache.set(cacheKey, JSON.stringify({ metadata, mediaUrl }), 10000);

    return { metadata, mediaUrl };
  } catch (error) {
    console.error(`Error fetching metadata from IPFS:`, error);
    return { metadata: null, mediaUrl: `${process.env.IPFS_GATEWAY}/ipfs/${defaultImageHash}` };
  }
};

const fetchIPFSMetadataCollection = async (offchainData: string): Promise<{ metadata: any; bannerUrl: string, profileUrl: string }> => {
  const defaultBannerHash = "Qm..."; // Remplacez par un hash IPFS par défaut pour la bannière
  const defaultProfileHash = "Qm..."; // Remplacez par un hash IPFS par défaut pour l'image de profil
  const cacheKey = `ipfs:collection:${offchainData}`;
  const cachedData = await cache.get(cacheKey);

  if (cachedData) {
    return JSON.parse(cachedData);
  }

  try {
    const metadata = await ipfsClient.getFile(offchainData) as any;
    const bannerUrl = metadata?.banner_image
      ? `${process.env.IPFS_GATEWAY}/ipfs/${metadata.banner_image}`
      : `${process.env.IPFS_GATEWAY}/ipfs/${defaultBannerHash}`;
    const profileUrl = metadata?.profile_image
      ? `${process.env.IPFS_GATEWAY}/ipfs/${metadata.profile_image}`
      : `${process.env.IPFS_GATEWAY}/ipfs/${defaultProfileHash}`;

    // Stocker dans le cache
    const cacheValue = JSON.stringify({ metadata, bannerUrl, profileUrl });
    await cache.set(cacheKey, cacheValue, 10000);

    return { metadata, bannerUrl, profileUrl };
  } catch (error) {
    console.error(`Error fetching collection metadata from IPFS:`, error);
    // Utiliser les images par défaut en cas d'échec de la récupération des données IPFS
    return {
      metadata: null,
      bannerUrl: `${process.env.IPFS_GATEWAY}/ipfs/${defaultBannerHash}`,
      profileUrl: `${process.env.IPFS_GATEWAY}/ipfs/${defaultProfileHash}`
    };
  }
};

export const getNftData = async (id: string): Promise<NFTEntity> => {
  const cacheKey = `nft:${id}`;
  const cachedData = await cache.get(cacheKey);

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
        royalty
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
  `;

  try {
    const response = await request<{ nftEntity: NFTEntity }>(process.env.GRAPHQL_ENDPOINT, gqlQuery);
    const nft = response.nftEntity;
    const { metadata, mediaUrl } = await fetchIPFSMetadata(nft.offchainData);

    await cache.set(cacheKey, JSON.stringify({ ...nft, metadata, mediaUrl }), 3600); // Cache pour 1 heure
    
    return { ...nft, metadata, mediaUrl };
  } catch (error) {
    console.error('Error fetching NFT:', error);
    throw new Error('Error fetching NFT');
  }
};
// Récupère les NFTs appartenant à un propriétaire spécifique avec pagination
export const getNFTfromOwner = async (owner: string, limit = 10, offset = 0): Promise<{ nfts: NFTEntity[], totalCount: number }> => {
  const cacheKey = `ownerNFTs:${owner}:${limit}:${offset}`;
  const cachedData = await cache.get(cacheKey);

  if (cachedData) {
    return JSON.parse(cachedData);
  }

  const gqlQuery = gql`
    query GetNFTsFromOwner($owner: String!, $first: Int!, $offset: Int!) {
      nftEntities(
        filter: { owner: { equalTo: $owner } }
        first: $first
        offset: $offset
        orderBy: TIMESTAMP_CREATED_DESC
      ) {
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
    const response = await request<NFTResponse>(process.env.GRAPHQL_ENDPOINT!, gqlQuery, {
      owner,
      first: limit,
      offset
    });

    const nfts = await Promise.all(response.nftEntities.nodes.map(async (nft) => {
      const { metadata, mediaUrl } = await fetchIPFSMetadata(nft.offchainData);
      return { ...nft, metadata, mediaUrl };
    }));

    await cache.set(cacheKey, JSON.stringify({ nfts, totalCount: response.nftEntities.totalCount }), 3600); // Cache pour 1 heure

    return { nfts, totalCount: response.nftEntities.totalCount };
  } catch (error) {
    console.error('Error fetching NFTs from owner:', error);
    throw new Error('Error fetching NFTs from owner');
  }
};


// Fonction pour récupérer la liste des NFTs avec pagination
export const getLastListedNFTs = async (limit = 10, offset = 0): Promise<{ nfts: NFTEntity[], totalCount: number }> => {
  const cacheKey = `nfts:${limit}:${offset}`;
  const cachedData = await cache.get(cacheKey);

  if (cachedData) {
    return JSON.parse(cachedData);
  }

  const gqlQuery = gql`
    query GetNFTs($first: Int!, $offset: Int!) {
      nftEntities(first: $first, offset: $offset, orderBy: TIMESTAMP_CREATED_DESC) {
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
    const response = await request<NFTResponse>(process.env.GRAPHQL_ENDPOINT!, gqlQuery, {
      first: limit,
      offset
    });

    const nfts = await Promise.all(response.nftEntities.nodes.map(async (nft) => {
      const { metadata, mediaUrl } = await fetchIPFSMetadata(nft.offchainData);
      return { ...nft, metadata, mediaUrl };
    }));

    await cache.set(cacheKey, JSON.stringify({ nfts, totalCount: response.nftEntities.totalCount }), 10);

    return { nfts, totalCount: response.nftEntities.totalCount };
  } catch (error) {
    console.error('Error fetching NFTs:', error);
    throw new Error('Error fetching NFTs');
  }
};

export const getCollections = async (limit = 10, offset = 0): Promise<{ collections: CollectionEntity[], totalCount: number }> => {
  const cacheKey = `collections:${limit}:${offset}`;
  const cachedData = await cache.get(cacheKey);

  if (cachedData) return JSON.parse(cachedData);

  const gqlQuery = gql`
    query GetCollections($first: Int!, $offset: Int!) {
      collectionEntities(first: $first, offset: $offset, orderBy: TIMESTAMP_CREATED_DESC) {
        totalCount
        nodes {
          collectionId
          owner
          offchainData
          nfts
          nbNfts
          hasReachedLimit
          isClosed
          timestampCreated
          timestampBurned
          timestampClosed
          timestampLimited
        }
      }
    }
  `;

  try {
    const response = await request<CollectionResponse>(process.env.GRAPHQL_ENDPOINT!, gqlQuery, {
      first: limit,
      offset
    });

    const collections = await Promise.all(response.collectionEntities.nodes.map(async (collection) => {
      const { metadata, bannerUrl, profileUrl } = await fetchIPFSMetadataCollection(collection.offchainData);
      return { ...collection, ...metadata, bannerUrl, profileUrl };
    }));

    await cache.set(cacheKey, JSON.stringify({ collections, totalCount: response.collectionEntities.totalCount }), 10);

    return { collections, totalCount: response.collectionEntities.totalCount };
  } catch (error) {
    console.error('Error fetching NFT collections:', error);
    throw new Error('Error fetching NFT collections');
  }
};
