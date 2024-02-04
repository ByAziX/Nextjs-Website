import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Container,
  SimpleGrid,
  VStack,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import FAQSection from '../components/FAQSection';
import SiteTools from '../components/SiteTools';
import { GetServerSideProps } from 'next';
import { getLastListedNFTs } from '../services/nftService';
import { getCollections } from '../services/collectionService';
import { NFTEntity, IndexPageProps } from '../components/interfaces';
import NFTCard from '../components/NFTCard';
import Carousel from '../components/Carousel';
import CollectionCard from '../components/CollectionCard';


const IndexPage: React.FC<IndexPageProps> = ({ nfts, last_nft, collections }) => {
  const bgGradient = useColorModeValue('linear(to-l, #7928CA, #9A4DFF)', 'linear(to-l, #9A4DFF, #D6A4FF)');

  return (
    <Container maxW="container.xl" p={0}>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        align="center"
        justify="space-between"
        my={10}
        p={5}
      >
        <Box flex="1" mr={{ base: 0, md: 5 }}>
        <Heading as="h2" size="xl" mb={4}>
        Collect & <Text as="span" bgClip="text" bgGradient={bgGradient} fontWeight="extrabold">Sell Super Rare NFTs</Text>
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
            item={last_nft as NFTEntity}
            width={"auto"}
            height={"auto"}
          />
        </Box>
      </Flex>



      <Heading size="lg" display="flex" alignItems="center">

      <Text as="span" fontWeight="bold">Featured Collections</Text>
      </Heading>
      <Text fontSize="md" color="gray.500">
      Discover the latest treasures from our community
      </Text>
      

      <VStack spacing={5} my="10">
      <Carousel items={collections} CardComponent={CollectionCard} />
      </VStack>

    <Heading size="lg" display="flex" alignItems="center">

      <Text as="span" fontWeight="bold">Last NFTs on Sales</Text>
    </Heading>
    <Text fontSize="md" color="gray.500">
      Discover the latest treasures from our community
    </Text>

      <VStack spacing={5} my="10">
      <Carousel items={nfts} CardComponent={NFTCard} />

      </VStack>

      <SiteTools />
      <FAQSection />
      
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const { nfts } = await getLastListedNFTs(6, 0);
  const {collections} = await getCollections(6, 0);
  const last_nft = nfts[0];
  return { props: { nfts, last_nft,collections } };
};

export default IndexPage;
