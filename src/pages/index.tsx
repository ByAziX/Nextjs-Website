// pages/index.tsx
import React from 'react';
import {
  Button, Heading, Text, VStack, Link
} from '@chakra-ui/react';
import Head from 'next/head';
import NextLink from 'next/link';


const IndexPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>NFT Marketplace</title>
      </Head>
      <VStack my="10" spacing="5" textAlign="center">
        <Heading as="h2" size="3xl">
          Discover, Collect, and Sell Extraordinary NFTs
        </Heading>
        <Text fontSize="xl">
          NFT Marketplace is the premier destination for NFTs on the blockchain. Explore the marketplace for the best digital art and collectibles.
        </Text>
        <Link as={NextLink} href="/explore" passHref>
        <Button size="lg" colorScheme="orange" px="8">
          Explore Now
        </Button>
        </Link>
      </VStack>

    </>
  );
};


export default IndexPage;
