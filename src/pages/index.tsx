import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Text,
  VStack,
  Icon,
  Divider,
  Link,
  Stack,
  DarkMode,
  
} from '@chakra-ui/react';
import Head from 'next/head';
import React from 'react';
import { GetServerSideProps } from 'next';

import NFTCard, { NFT } from '../components/NFTCard';
import { getLastListedNFTs } from '../services/nftService';



interface IndexProps {
  nfts: NFT[];
}

const IndexPage: React.FC<IndexProps> = ({ nfts }) => {

  return (
    <>
      <Head>
        <title>NFT Marketplace</title>
      </Head>
      
          {/* Main Banner */}
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

          
          <VStack my="10" spacing="5">
            <Heading as="h2" size="xl">
              Featured NFTs
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing="4">
              {nfts.map((nft) => (
                <NFTCard key={nft.nftId} nft={nft} />
              ))}
            </SimpleGrid>
          </VStack>

          </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const nfts = await getLastListedNFTs();
  return { props: { nfts } };
};

export default IndexPage;
