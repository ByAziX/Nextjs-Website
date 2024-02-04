// components/NFTList.tsx
import React from 'react';
import { SimpleGrid, VStack, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import Pagination from './Pagination';
import NFTCard from './NFTCard';
import {NFTListProps} from './interfaces'
import SortFilterNFT from './SortFilterNFT';



const DEFAULT_LIMIT = 24;

const NFTList: React.FC<NFTListProps> = ({ nfts, totalCount, currentPage,sortBy }) => {
  const router = useRouter();
  const totalPages = Math.ceil(totalCount / DEFAULT_LIMIT);

  const handlePageChange = (page: number) => {
    const query = { ...router.query, page: page.toString() };
    router.push({
      pathname: router.pathname,
      query,
    });
  };

  return (
    <VStack spacing={5} my="10">
      <Heading as="h2" size="xl">
    {`Explore ${totalCount} NFTs`}
  </Heading>
  <SortFilterNFT value={sortBy} />
      <SimpleGrid columns={{ base: 2, md: 6 }} spacing="4">
        {nfts.map((nft) => <NFTCard key={nft.nftId} item={nft} />)}
      </SimpleGrid>
      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={handlePageChange} 
      />
    </VStack>
  );
};

export default NFTList;
