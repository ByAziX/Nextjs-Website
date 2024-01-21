import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Image, Text, Skeleton, VStack, useColorModeValue, Tooltip, Link, Badge } from '@chakra-ui/react';
import NextLink from 'next/link';
import {NFTEntity} from './interfaces'


const NFTCard: React.FC<{ nft: NFTEntity }> = ({ nft }) => {
  const bgColor = useColorModeValue('light.bg', 'dark.bg');
  const textColor = useColorModeValue('light.text', 'dark.text');
  
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const handleBoxClick = () => {
    router.push(`/nft/${nft.nftId}`);
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
      width={'200px'} 
      height="auto"
    >
      <Box position="relative" height="200px" overflow="hidden">
        {isLoading && <Skeleton height="200px" />}
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
          <Link as={NextLink} href={`/nft/${nft.nftId}`} passHref>
              NFT N°{nft.nftId}
          </Link>
        </Tooltip>

        {nft.collection && (
          <Tooltip label="NFT collection id" aria-label="NFT collection">
            <Link as={NextLink} href={`/collection/${nft.collection.collectionId}`} passHref>
                Collection N°{nft.collection.collectionId}
            </Link>
          </Tooltip>
        )}

        {nft.isListed && (
          <><Badge colorScheme="green">Listed for sale</Badge><Text fontWeight="bold" my={4}></Text><Tooltip label="NFT price" aria-label="NFT price">
            <Text fontSize="xs" fontWeight="bold">
              Price: {nft.priceRounded} CAPS
            </Text>
          </Tooltip></>
        )}
      </VStack>
    </Box>
  );
};

export default NFTCard;
