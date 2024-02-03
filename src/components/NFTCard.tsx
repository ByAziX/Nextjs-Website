import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Image, Text, Skeleton, VStack, useColorModeValue, Tooltip, Link, Badge } from '@chakra-ui/react';
import NextLink from 'next/link';
import { NFTEntity } from './interfaces';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const NFTCard: React.FC<{ nft: NFTEntity; width?: string | number; height?: string | number }> = ({
  nft,
  width = '200px', 
  height = '340px', // auto si jamais
}) => {
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
    <MotionBox
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg={bgColor}
      color={textColor}
      shadow="md"
      whileHover={{ scale: 1.02, shadow: "lg" }}
      onClick={handleBoxClick}
      cursor="pointer"
      width={width} 
      height={height}
      transition={{ duration: 0.2 }}
    >
      <Box position="relative" height={width} overflow="hidden">
        {isLoading && <Skeleton height={width} />}
        <Image
          src={nft.mediaUrl}
          alt={`Image for NFT ${nft.nftId}`}
          fallbackSrc='https://via.placeholder.com/100'
          onLoad={handleImageLoaded}
          onError={handleImageError}
          style={{ display: isLoading ? 'none' : 'block', width: '100%', height: '100%', objectFit: 'contain' }}
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
            <Badge colorScheme="green">Listed for sale</Badge>
            )}
        {nft.priceRounded && (
          <Text fontSize="xs" fontWeight="bold">
            Price: {nft.priceRounded} CAPS
          </Text>
        )}
      </VStack>
    </MotionBox>
  );
};

export default NFTCard;
