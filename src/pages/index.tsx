import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  Link,
  Icon,
  Container,
  HStack,
  Divider,
  GridItem,
  useColorModeValue,
} from '@chakra-ui/react';
import { CheckCircleIcon, StarIcon } from '@chakra-ui/icons';
import Head from 'next/head';
import React from 'react';

import dynamic from 'next/dynamic';

const Connect = dynamic(() => import('../components/Connect').then(m => m.Connect), {
  ssr: false,
});

const IndexPage = () => {
  return (
    <>
      <Head>
        <title>NFT Marketplace</title>
      </Head>

      <Box as="main" minH="100vh">
        <Container maxW="container.xl">
          {/* Header */}
          <Flex as="header" justifyContent="space-between" py="4" align="center">
            <Heading as="h1" size="xl">
              NFT Marketplace
            </Heading>
            <HStack spacing="5">
              <Connect />
              
              <Button colorScheme="teal">Create NFT</Button>
            </HStack>
          </Flex>

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

          {/* Featured NFTs Gallery */}
          <Box my="10">
            <Heading as="h3" size="lg" mb="4">
              Featured NFTs
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing="4">
              {/* Map through your NFTs data here to display NFT cards */}
            </SimpleGrid>
          </Box>

          {/* How It Works Section */}
          <VStack my="10" spacing="5">
            <Heading as="h3" size="lg">
              How It Works
            </Heading>
            <HStack spacing="10">
              <Box>
                <Text fontSize="xl">
                  Create your collectible
                </Text>
                <Text>
                  Our easy-to-use platform allows you to mint your NFT and put it up for sale or auction in minutes.
                </Text>
              </Box>
              <Box>
                <Text fontSize="xl">
                  Discover unique assets
                </Text>
                <Text>
                  Browse through a wide array of digital art, collectibles, and more. Find hidden gems and new creations daily.
                </Text>
              </Box>
              <Box>
                <Text fontSize="xl">
                  Secure transactions
                </Text>
                <Text>
                  Purchase with confidence using our secure blockchain-based transaction system.
                </Text>
              </Box>
            </HStack>
          </VStack>

          {/* Benefits Section */}
          <VStack my="10" spacing="5">
            <Heading as="h3" size="lg">
              Why Choose Our Marketplace?
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing="4">
              <Box>
                <Icon as={StarIcon} w={10} h={10} color="yellow.400" />
                <Text fontSize="xl">
                  Trusted by the community
                </Text>
              </Box>
              <Box>
                <Icon as={CheckCircleIcon} w={10} h={10} color="green.400" />
                <Text fontSize="xl">
                  Curated Collections
                </Text>
              </Box>
              <Box>
                <Icon as={StarIcon} w={10} h={10} color="yellow.400" />
                <Text fontSize="xl">
                  Lowest Fees
                </Text>
              </Box>
            </SimpleGrid>
          </VStack>

          {/* Call to Action */}
          <VStack my="10" spacing="5">
            <Heading as="h3" size="lg">
              Start Your NFT Journey Today
            </Heading>
            <Button size="lg" colorScheme="pink" px="8">
              Get Started
            </Button>
          </VStack>

          {/* Footer */}
          <Box as="footer" py="10">
            <Divider my="5" />
            <Flex justifyContent="space-between">
              <Text>© NFT Marketplace. All rights reserved.</Text>
              <Stack direction="row" spacing="4">
                <Link>About Us</Link>
                <Link>Terms of Service</Link>
                <Link>Privacy Policy</Link>
              </Stack>
            </Flex>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default IndexPage;
