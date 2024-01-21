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
    router.push(`/nft/${nft.nftId}`);
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
        
        <Tooltip label="NFT id" aria-label="NFT id">
        <Link as={NextLink} onClick={stopPropagation} href={`/nft/${nft.nftId}`}>
          <Text fontSize="xs" fontWeight="bold">
            NFT N°{nft.nftId}
          </Text>
          </Link>
        </Tooltip>
        
        <Tooltip label="NFT collection id" aria-label="NFT collection">
        <Link as={NextLink} onClick={stopPropagation} href={`/collection/${nft.collectionId}`}>
          <Text fontSize="xs" fontWeight="bold">
            Collection N°{nft.collectionId}
          </Text>
          </Link>
        </Tooltip>

        <Tooltip label="NFT price" aria-label="NFT price">
          <Text fontSize="xs" fontWeight="bold">
            Price {nft.priceRounded}
          </Text>
        </Tooltip>
        

      </VStack>
    </Box>
  );
};

export default NFTCard;
