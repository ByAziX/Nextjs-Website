import React from 'react';
import {
  Box, Image, Text, useColorModeValue, Badge, VStack, HStack, AspectRatio
} from '@chakra-ui/react';
import { CollectionEntity } from './interfaces';

interface CollectionCardProps {
  item: CollectionEntity;
  width?: string | number;
  height?: string | number;
}

const CollectionCard: React.FC<CollectionCardProps> = ({
  item,
  width = '300px', // Vous pouvez ajuster la largeur par défaut ici
  height = 'auto', // La hauteur peut être 'auto' pour s'adapter au contenu
}) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg={bgColor}
      color={textColor}
      shadow="md"
      width={width}
      height={height}
      m={2} // Margin pour espacer les cartes
    >
        <AspectRatio ratio={4 / 3}>
            <Image
              src={item?.bannerUrl || 'https://via.placeholder.com/100'}
              alt={`Banner for collection ${item?.collectionId || 'unknown'}`}
              fallbackSrc='https://via.placeholder.com/100'
              objectFit="contain"
            />
        </AspectRatio>
        <VStack p="2" align="left" spacing={1}>
            <HStack spacing={2} align="center">
                <Image
                  borderRadius="full"
                  boxSize="50px"
                  src={item?.profileUrl || 'https://via.placeholder.com/50'}
                  alt={`Logo for collection ${item?.collectionId}`}
                  fallbackSrc='https://via.placeholder.com/50'
                />
                <Text fontSize="lg" fontWeight="bold">
                  {item.name}
                </Text>
            </HStack>
            <HStack>
            <Badge colorScheme="purple">Collection ID: {item.collectionId}</Badge>
                <Badge colorScheme="purple">{item.nbNfts} NFTs</Badge>
            </HStack>
            <HStack>
                <Badge colorScheme={item.isClosed ? "red" : "gray"}>
                  {item.isClosed ? 'Closed ✓' : 'Not Closed ✕'}
                </Badge>
                <Badge colorScheme={item.hasReachedLimit ? "green" : "gray"}>
                  {item.hasReachedLimit ? `Limit ✓` : 'Unlimited ✕'}
                </Badge>
            </HStack>

        </VStack>
    </Box>
  );
};

export default CollectionCard;
