import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Image, Text, Link, Skeleton, VStack, useColorModeValue, Tooltip } from '@chakra-ui/react';

export interface NFT {
  nftId: string;
  owner: string;
  creator: string;
  collectionId: string;
  offchainData: string;
  metadata?: {
    title?: string;
    description?: string;
    image?: string;
    properties?: {
      media?: {
        hash: string;
        type: string;
        size: number;
      };
    };
  };
  mediaUrl: string;
}

const NFTCard: React.FC<{ nft: NFT }> = ({ nft }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'white');
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const handleBoxClick = () => {
    router.push(`/nfts/${nft.nftId}`);
  };

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleImageLoaded = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    // Gestion d'erreur supplémentaire si nécessaire
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg={bgColor}
      color={textColor}
      shadow="md"
      onClick={handleBoxClick}
      cursor="pointer"
      _hover={{ shadow: "lg", transform: "scale(1.05)" }}
    >
      <Box position="relative" height="400px" overflow="hidden">
        {isLoading && (
          <Skeleton height="400px" />
        )}
        <Image
          src={nft.mediaUrl}
          alt={`Image for NFT ${nft.nftId}`}
          loading="lazy" 
          onLoad={handleImageLoaded}
          onError={handleImageError}
          style={{ display: isLoading ? 'none' : 'block', width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Box>
      <VStack p="6" align="left" spacing={2}>
        {nft.metadata?.title && (
          <Text fontSize="lg" fontWeight="bold">
            {nft.metadata.title}
          </Text>
        )}
        {nft.metadata?.description && (
          <Text fontSize="sm">
            {nft.metadata.description}
          </Text>
        )}
        <Tooltip label="Unique identifier for NFT" aria-label="NFT ID">
          <Text fontSize="sm" fontWeight="bold">
            ID: {nft.nftId}
          </Text>
        </Tooltip>
        <Link onClick={stopPropagation} href={`/profile/${nft.owner}`}>
          <Text fontSize="sm">Owner: {nft.owner}</Text>
        </Link>
        <Text fontSize="sm">Creator: {nft.creator}</Text>
        <Text fontSize="sm">Collection: {nft.collectionId}</Text>
        <Text fontSize="sm">Offchain Data: {nft.offchainData}</Text>
        <Text fontSize="sm">Media URL: {nft.mediaUrl}</Text>
      </VStack>
    </Box>
  );
};

export default NFTCard;
