import React from 'react';
import {
  Box, Flex, Heading, Text, Button, SimpleGrid, useColorModeValue, Icon, Container, VStack, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Grid, GridItem, Image
} from '@chakra-ui/react';
import { FaEthereum, FaPaintBrush, FaHandshake, FaLock, FaArrowRight, FaRegQuestionCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Framer Motion MotionBox for animations
const MotionBox = motion(Box);

// Feature Component with Motion for site functionalities
const Feature = ({ title, icon, children }) => (
  <VStack
    as={MotionBox}
    whileHover={{ scale: 1.05 }}
    bg={useColorModeValue('white', 'gray.800')}
    p={5}
    rounded="lg"
    borderWidth="1px"
    _hover={{ shadow: 'xl' }}
    transition="all 0.3s ease-out"
  >
    <Icon as={icon} w={8} h={8} color={useColorModeValue('teal.500', 'teal.200')} />
    <Heading size="md">{title}</Heading>
    <Text>{children}</Text>
  </VStack>
);

// NFT Collection Preview Component
const NFTCollectionPreview = ({ title, image, description }) => (
  <GridItem colSpan={{ base: 2, md: 1 }} as={MotionBox} whileHover={{ scale: 1.05 }} transition="all 0.3s ease-out">
    <Image src={image} alt={title} borderRadius="md" mb={4} />
    <Heading size="md" mb={2}>{title}</Heading>
    <Text fontSize="sm">{description}</Text>
  </GridItem>
);

const IndexPage = () => {
  const bgColor = useColorModeValue('light.bg', 'dark.bg');
  const textColor = useColorModeValue('light.text', 'dark.text');

  return (
    <Container maxW="container.xl" p={0}>
      {/* Hero Section */}
      <Flex
        bgImage="url('/nft-marketplace-background.webp')"
        bgSize="cover"
        bgPos="center"
        bgRepeat="no-repeat"
        h="60vh"
        align="center"
        justify="center"
        direction="column"
        color="white"
        textAlign="center"
      >
        <Heading size="3xl" mb={4}>Discover Unique Digital Art</Heading>
        <Text fontSize="xl" mb={6}>Explore, buy, and sell rare digital art on the blockchain.</Text>
        <Button rightIcon={<FaArrowRight />} colorScheme="teal" variant="solid">Get Started</Button>
      </Flex>

      {/* Highlighted Collections */}
      <Heading size="lg" textAlign="center" my={10}>Featured Collections</Heading>
      <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }} gap={6}>
        <NFTCollectionPreview
          title="Abstract Art"
          image="/nft-marketplace-background.webp"
          description="Dive into the world of abstraction."
        />
        <NFTCollectionPreview
          title="Virtual Landscapes"
          image="/nft-marketplace-background.webp"
          description="Own a piece of virtual paradise."
        />
        {/* More collections previews */}
      </Grid>

      {/* Last nft sales */}
      <Heading size="lg" textAlign="center" my={10}> Last nft sales </Heading>
      <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }} gap={6}>
        <NFTCollectionPreview
          title="Abstract Art"
          image="/nft-marketplace-background.webp"
          description="Dive into the world of abstraction."
        />
        <NFTCollectionPreview
          title="Virtual Landscapes"
          image="/nft-marketplace-background.webp"
          description="Own a piece of virtual paradise."
        />
        {/* More collections previews */}
      </Grid>

      {/* Site Features */}
      <Heading size="lg" textAlign="center" my={10}>Why Choose Us</Heading>
      <SimpleGrid columns={{ base: 1, md: 4 }} spacing={10}>
        <Feature title="Mint NFTs" icon={FaPaintBrush}>Easily create and list your digital art.</Feature>
        <Feature title="Trade Securely" icon={FaHandshake}>Secure transactions with blockchain technology.</Feature>
        <Feature title="Earn Rewards" icon={FaLock}>Stake your NFTs and earn crypto rewards.</Feature>
        <Feature title="Discover Rare Art" icon={FaEthereum}>Access exclusive digital artworks.</Feature>
      </SimpleGrid>

      {/* FAQ Section */}
      <Box py={10} mt={10}>
        <Heading size="lg" textAlign="center" mb={6}>FAQs</Heading>
        <Accordion allowToggle>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  What is an NFT?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Non-Fungible Tokens (NFTs) represent ownership of unique digital items using blockchain technology.
            </AccordionPanel>
          </AccordionItem>
          {/* Additional FAQs */}
        </Accordion>
      </Box>
    </Container>
  );
};

export default IndexPage;
