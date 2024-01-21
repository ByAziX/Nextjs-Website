import React from 'react';
import { Box, Flex, Image, Text, Heading, Badge, Button, VStack } from '@chakra-ui/react';
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
    return <Box>Loading...</Box>;
  }

  return (
    <Flex align="start" p={5}>
      <Box flexShrink={0}>
        <Image
          borderRadius="lg"
          src={nft.mediaUrl}
          alt={`Image of ${nft.metadata?.title}`}
          boxSize="300px" // Adjust the size as needed
          objectFit="cover"
        />
      </Box>
      <VStack align="start" ml={5}>
        <Heading as="h2" size="2xl">{nft.metadata?.title}</Heading>
        <Text color="gray.500">{nft.metadata?.description}</Text>
        <Badge colorScheme="purple" p={1}>
          Collection #{nft.collectionId}
        </Badge>
        <Text fontWeight="bold">Owner: {nft.owner}</Text>
        <Text fontWeight="bold">Creator: {nft.creator}</Text>
        <Text fontWeight="bold">Price: {nft.priceRounded} ETH</Text>
        
        <Button colorScheme="blue" mt={4}>Buy Now</Button>
        <Button variant="outline" colorScheme="blue" mt={2}>Make Offer</Button>
      </VStack>
    </Flex>
  );
};

// This function runs on the server on every request
export async function getServerSideProps(context) {
  const { nftId } = context.params;
  try {
    const nft = await getNftData(nftId);
    return { props: { nft } }; // These props will be passed to the component
  } catch (error) {
    console.error('Error fetching NFT details:', error);
    return { props: { nft: null } };
  }
}

export default NFTDetailsPage;
