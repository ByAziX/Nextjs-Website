// components/NFTList.tsx
import React from 'react';
import { SimpleGrid, VStack, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import Pagination from './Pagination';
import NFTCard from './NFTCard';
import {NFTListProps} from './interfaces'
import SortFilterNFT from './SortFilterNFT';



const DEFAULT_LIMIT = 24;

const NFTList: React.FC<NFTListProps> = ({ nfts, totalCount,sortBy }) => {
  const router = useRouter();

  return (
    <VStack spacing={5} my="10">
      <Heading as="h2" size="xl">
    {`Explore ${totalCount} NFTs`}
  </Heading>
  <SortFilterNFT value={sortBy} />
      <SimpleGrid columns={{ base: 2, md: 6 }} spacing="4">
        {nfts.map((nft) => <NFTCard key={nft.nftId} item={nft} />)}
      </SimpleGrid>

    </VStack>
  );
};

export default NFTList;
