// pages/index.tsx
import React from 'react';
import {
  Button, Heading, Text, VStack
} from '@chakra-ui/react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';

import NFTList from '../components/NFTList';
import { getLastListedNFTs } from '../services/nftService';
import { NFT } from '../components/NFTCard';

const DEFAULT_LIMIT = 9; // Nombre de NFTs par page

interface IndexProps {
  nfts: NFT[];
  totalCount: number; // Total des NFTs disponibles
  currentPage: number;
}

const IndexPage: React.FC<IndexProps> = ({ nfts, totalCount, currentPage }) => {
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
        <Button size="lg" colorScheme="orange" px="8">
          Explore Now
        </Button>
      </VStack>

      <NFTList nfts={nfts} totalCount={totalCount} currentPage={currentPage} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const page = parseInt(context.query.page as string) || 1;
  const offset = (page - 1) * DEFAULT_LIMIT;
  const { nfts, totalCount } = await getLastListedNFTs(DEFAULT_LIMIT, offset);
  return { props: { nfts, totalCount, currentPage: page } };
};

export default IndexPage;
