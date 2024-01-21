// pages/nfts/[nftId].tsx
import React from 'react';
import { Box, Image, Text, VStack, Heading } from '@chakra-ui/react';
import { getNftData } from '../../services/nftService';

export interface NFT {
  nftId: string;
  owner: string;
  creator: string;
  collectionId: string;
  offchainData: string;
  priceRounded: number;
  metadata?: {
    title?: string;
    description?: string;
    image?: string;
    properties?: {
      media?: {
        hash: string;
        type: string;
        size: number;
      }
    };
  };
  mediaUrl: string;
}

const NFTDetailsPage = ({ nft }: { nft: NFT }) => {
  if (!nft) {
    return <div>Loading...</div>;
  }

  return (
    <VStack spacing={4} align="stretch" p={5}>
      <Heading as="h1" size="xl">{nft.metadata?.title}</Heading>
      <Image src={nft.mediaUrl} alt={nft.metadata?.title} borderRadius="lg" />
      
      <Box>
        <Text fontSize="md" color="gray.500">Created by {nft.creator}</Text>
        <Text fontSize="md" color="gray.500">Owned by {nft.owner}</Text>
      </Box>

      <Box>
        <Text fontSize="lg">{nft.metadata?.description}</Text>
      </Box>

      {/* Ajoutez ici d'autres informations ou actions spécifiques au NFT */}
    </VStack>
  );
};

// Cette fonction s'exécute côté serveur à chaque requête
export async function getServerSideProps(context) {
  const { nftId } = context.params;
  try {
    const nft = await getNftData(nftId);
    return { props: { nft } }; // Ces props seront passés au composant NFTDetailsPage
  } catch (error) {
    console.error('Error fetching NFT details:', error);
    return { props: { nft: null } };
  }
}

export default NFTDetailsPage;
