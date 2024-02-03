import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Image,
  useColorModeValue,
  Icon,
  Container,
  SimpleGrid,
  VStack,
  Grid,
  GridItem,
  chakra,
  Badge,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel
} from '@chakra-ui/react';
import { FaEthereum, FaPaintBrush, FaHandshake, FaLock, FaArrowRight, FaCoins, FaUserShield, FaChartLine } from 'react-icons/fa';
import { motion } from 'framer-motion';
import FAQSection from '../components/FAQSection';
import SiteTools from '../components/SiteTools';
import { GetServerSideProps } from 'next';
import { getLastListedNFTs } from '../services/nftService';
import { NFTEntity, NFTListProps } from '../components/interfaces';

const MotionBox = motion(Box);

const NFTCard = ({ image, title, currentBid }) => (
  <MotionBox
    whileHover={{ scale: 1.05 }}
    transition="all 0.3s ease-out"
    bg={useColorModeValue('white', 'gray.800')}
    p={5}
    rounded="lg"
    borderWidth="1px"
    shadow="lg"
  >
    <Image borderRadius="lg" src={image} alt={title} mb={4} />
    <Heading size="md" mb={2}>{title}</Heading>
    <Flex alignItems="center" justifyContent="space-between">
      <Badge colorScheme="purple" p="1" borderRadius="full">
        Current Bid
      </Badge>
      <Box fontSize="lg" fontWeight="bold">
        {currentBid} CAPS
      </Box>
    </Flex>
  </MotionBox>
);

const IndexPage: React.FC<NFTListProps & { last_nft: NFTEntity }> = ({ nfts, last_nft }) => {

  return (
    <Container maxW="container.xl" p={0}>
      {/* Text à gauche + une card nft a droit */}
      <Flex
        direction={{ base: 'column', md: 'row' }}
        align="center"
        justify="space-between"
        my={10}
        p={5}
      >
        <Box flex="1" mr={{ base: 0, md: 5 }}>
          <Heading as="h2" size="xl" mb={4}>
            Collect & Sell Super Rare NFTs
          </Heading>
          <Text fontSize="lg" mb={4}>
            Produce an exclusive NFT collection of over 10,000 items by uploading the necessary layers, and prepare to market your collection for sale.
          </Text>
          <Button colorScheme="purple" mb={4} marginRight={2}>
            Let's Start
          </Button>
          
          <Button variant="outline" colorScheme="purple" mb={4}>
            Join Discord
          </Button>
        </Box>
        <Box flex="1" ml={{ base: 0, md: 5 }}>
          <NFTCard
            key={last_nft.nftId}
            image={last_nft.mediaUrl}
            title={last_nft.metadata.title}
            currentBid={last_nft.priceRounded}
          />
        </Box>
      </Flex>

      {/* Highlighted Collections */}
      <VStack spacing={5} my="10">
      <Heading size="lg" textAlign="center" my={10}>Featured Collections</Heading>
          <SimpleGrid columns={{ base: 1, md: 5 }} spacing="4">
            {nfts.map((nft) => <NFTCard key={nft.nftId} image={nft.mediaUrl} title={nft.metadata.title} currentBid={nft.priceRounded} />)}
          </SimpleGrid>
        </VStack>
        

      {/* Last nft sales */}
      <VStack spacing={5} my="10">
      <Heading size="lg" textAlign="center" my={10}>Last nft sales</Heading>
          <SimpleGrid columns={{ base: 1, md: 5 }} spacing="4">
            {nfts.map((nft) => <NFTCard key={nft.nftId} image={nft.mediaUrl} title={nft.metadata.title} currentBid={nft.priceRounded} />)}
          </SimpleGrid>
        </VStack>

      <SiteTools />
      <FAQSection />

    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const { nfts } = await getLastListedNFTs(5, 0);
  const last_nft = nfts[0];
  return { props: { nfts, last_nft } };
};

export default IndexPage;

