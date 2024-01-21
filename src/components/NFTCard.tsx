import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Image, Text, Skeleton, VStack, useColorModeValue, Tooltip } from '@chakra-ui/react';
import NextLink from 'next/link'
import { Link } from '@chakra-ui/react'



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

  // Adjust the card size and content for a mini-card
  const miniSize = '200px'; // example mini size, adjust as needed

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
      _hover={{ shadow: "lg", transform: "scale(1.02)" }} 
      width={miniSize} 
      height="auto" 
    >
      <Box position="relative" height={miniSize} overflow="hidden">
        {isLoading && <Skeleton height={miniSize} />}
        <Image
          src={nft.mediaUrl}
          alt={`Image for NFT ${nft.nftId}`}
          fallbackSrc='https://via.placeholder.com/100'
          onLoad={handleImageLoaded}
          onError={handleImageError}
          style={{ display: isLoading ? 'none' : 'block', width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Box>
      <VStack p="2" align="left" spacing={1}>
        {nft.metadata?.title && (
          <Text fontSize="md" fontWeight="bold">
            {nft.metadata.title}
          </Text>
        )}
        {/* Removed description for brevity in a mini-card */}
        <Tooltip label="Unique identifier for NFT" aria-label="NFT ID">
          <Text fontSize="xs" fontWeight="bold"> 
            ID: {nft.nftId}
          </Text>
        </Tooltip>
        
        <Tooltip label="NFT owner address" aria-label="NFT owner">
        <Link as={NextLink} onClick={stopPropagation} href={`/profile/${nft.owner}`}>
          <Text fontSize="xs" fontWeight="bold">
            Owner: {nft.owner}
          </Text>
          </Link>

        </Tooltip>

      </VStack>
    </Box>
  );
};

export default NFTCard;
