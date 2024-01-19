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
  }
  
  const NFTCard: React.FC<{ nft: NFT }> = ({ nft }) => {
    const bgColor = useColorModeValue('white', 'gray.800');
    const textColor = useColorModeValue('gray.600', 'white');
  
    return (
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        bg={bgColor}
        color={textColor}
        shadow="sm"
      >
        {/* This assumes that offchainData is a URL to the image */}
        <Image src={nft.offchainData} alt={`NFT ${nft.nftId}`} />
  
        <Box p="6">
          <Box display="flex" alignItems="baseline">
            {/* Additional NFT information here */}
            <Text fontSize="sm" fontWeight="bold">
              {nft.creator}
            </Text>
          </Box>
        </Box>
      </Box>
    );
  };
  
  export default NFTCard;
  