// components/NFTList.tsx
import React from 'react';
import { SimpleGrid, VStack, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import NFTCard, { NFT } from './NFTCard';
import Pagination from './Pagination';

export interface NFTListProps {
  nfts: NFT[];
  totalCount: number;
  currentPage: number;
}

const DEFAULT_LIMIT = 9;

const NFTList: React.FC<NFTListProps> = ({ nfts, totalCount, currentPage }) => {
  const router = useRouter();
  const totalPages = Math.ceil(totalCount / DEFAULT_LIMIT);

  const handlePageChange = (page: number) => {
    // Naviguer vers la nouvelle page tout en conservant d'autres paramètres de requête si nécessaire
    const query = { ...router.query, page: page.toString() };
    router.push({
      pathname: router.pathname,
      query,
    });
  };

  return (
    <VStack spacing={5} my="10">
      <Heading as="h2" size="xl">Featured NFTs</Heading>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing="4">
        {nfts.map((nft) => <NFTCard key={nft.nftId} nft={nft} />)}
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
