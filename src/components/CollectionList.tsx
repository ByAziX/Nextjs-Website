// components/NFTList.tsx
import React from 'react';
import { SimpleGrid, VStack, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import Pagination from './Pagination';
import NFTCard from './NFTCard';
import { CollectionListProps } from './interfaces';
import CollectionCard from './CollectionCard';



const DEFAULT_LIMIT = 24;

const CollectionList: React.FC<CollectionListProps> = ({ collections,totalCount,currentPage }) => {
  const router = useRouter();
  const handlePageChange = (page: number) => {
    const query = { ...router.query, page: page.toString() };
    router.push({
      pathname: router.pathname,
      query,
    });
  };
    const totalPages = Math.ceil(totalCount / DEFAULT_LIMIT);    

  return (
    <VStack spacing={5} my="10">
      <Heading as="h2" size="xl">
    {`Explore ${totalCount} Collections`}
  </Heading>
        <SimpleGrid columns={{ base: 2, md: 6 }} spacing="4">
            {collections.map((collection) => <CollectionCard key={collection.collectionId} item={collection} />)}
        </SimpleGrid>
        <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={handlePageChange} 
        />
    </VStack>
  );
};

export default CollectionList;