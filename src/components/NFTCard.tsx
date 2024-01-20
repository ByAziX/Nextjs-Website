// components/NFTCard.tsx
  import {
    Box,
    Image,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';
  import React from 'react';
  
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
        }
      }
    };
    mediaUrl: string;
  }
  
  const NFTCard: React.FC<{ nft: NFT }> = ({ nft }) => {
    const bgColor = useColorModeValue('white', 'gray.800');
    const textColor = useColorModeValue('gray.600', 'white');

    return (
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" bg={bgColor} color={textColor} shadow="sm">
        {nft.mediaUrl && <Image src={nft.mediaUrl} alt={`Image for NFT ${nft.nftId}`} />}
        
        <Box p="6">
          {nft.metadata?.title && <Text fontSize="lg" fontWeight="bold">{nft.metadata.title}</Text>}
          {nft.metadata?.description && <Text fontSize="sm">{nft.metadata.description}</Text>}
  
          <Text fontSize="sm" fontWeight="bold">ID: {nft.nftId}</Text>
          <Text fontSize="sm">Owner: {nft.owner}</Text>
          <Text fontSize="sm">Creator: {nft.creator}</Text>
          <Text fontSize="sm">Collection: {nft.collectionId}</Text>
          <Text fontSize="sm">Offchain Data: {nft.offchainData}</Text>
        </Box>
      </Box>
    );
  };
  
  export default NFTCard;
  