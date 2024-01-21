// pages/index.tsx
import React from 'react';
import {
  Box, Button, Heading, Text, VStack, Flex, Image, Divider, GridItem, Container, SimpleGrid, useColorModeValue, HStack
} from '@chakra-ui/react';
import Head from 'next/head';
import NextLink from 'next/link';

const IndexPage: React.FC = () => {
  const bgColor = useColorModeValue('light.bg', 'dark.bg');
  const textColor = useColorModeValue('light.text', 'dark.text');
  return (
    
    <>
      <Head>
        <title>NFT Marketplace</title>
      </Head>

      <Container maxW="container.xl" centerContent>

        {/* Hero Section */}
        <VStack my="10" spacing="5" textAlign="center" w="full">
          <Heading color={textColor} as="h1" size="4xl" >
            Discover, and collect Digital Art NFTs
          </Heading>
          <Text color={textColor} fontSize="xl" >
            Digital marketplace for crypto collectibles and non-fungible tokens (NFTs). Buy, Sell, and discover exclusive digital assets.
          </Text>
          <NextLink href="/explore" passHref>
            <Button size="lg" bg={bgColor}>
              Explore Now
            </Button>
          </NextLink>
          <HStack spacing="5">
            <Text color={textColor} fontSize="xl">98k+ <span>Artwork</span></Text>
            <Text color={textColor} fontSize="xl">12k+ <span>Auction</span></Text>
            <Text color={textColor} fontSize="xl">15k+ <span>Artist</span></Text>
          </HStack>
        </VStack>

        <Divider my="8" />

        {/* Featured Collections */}
        <Box my="10" w="full">
          <Heading as="h2" size="xl" mb="6" color="orange.400">
            Featured Collections
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing="6">
            {/* Replace these placeholders with real content */}
            {/* ... */}
          </SimpleGrid>
        </Box>

        <Divider my="8" />

        {/* Trending NFTs */}
        <Box my="10" w="full">
          <Heading as="h3" size="lg" mb="6" color="purple.400">
            Trending NFTs
          </Heading>
          <Flex wrap="wrap" justify="center" gap="4">
            {/* Replace these placeholders with real content */}
            {/* ... */}
          </Flex>
        </Box>

      </Container>
    </>
  );
};

export default IndexPage;
