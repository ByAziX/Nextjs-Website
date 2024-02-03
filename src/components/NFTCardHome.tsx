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
  AccordionPanel,
  Tooltip,
  Link
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import FAQSection from '../components/FAQSection';
import SiteTools from '../components/SiteTools';
import { GetServerSideProps } from 'next';
import { getLastListedNFTs } from '../services/nftService';
import { NFTEntity, NFTListProps } from '../components/interfaces';
import NFTCard from '../components/NFTCard';
import NextLink from 'next/link';

const MotionBox = motion(Box);

const NFTCardHome: React.FC<{ nft: NFTEntity }> = ({ nft }) => (
  <MotionBox
    whileHover={{ scale: 1.05 }}
    transition="all 0.3s ease-out"
    bg={useColorModeValue('white', 'gray.800')}
    p={5}
    rounded="lg"
    borderWidth="1px"
    shadow="lg"
  >
    <Image borderRadius="lg" src={nft.mediaUrl} alt={nft.metadata?.title} mb={4} />
    <VStack p="2" align="left" spacing={1}>
        {nft.metadata?.title && (
        <Heading size="md" mb={2}>{nft.metadata?.title}</Heading>
        )}
        <Tooltip label="NFT id" aria-label="NFT id">

          <Link as={NextLink} href={`/nft/${nft.nftId}`} passHref>
              NFT N°{nft.nftId}
          </Link>
        </Tooltip>

        {nft.collection && (
          <Tooltip label="NFT collection id" aria-label="NFT collection">
            <Link as={NextLink} href={`/collection/${nft.collection.collectionId}`} passHref>
                Collection N°{nft.collection.collectionId}
            </Link>
          </Tooltip>
        )}

        {nft.isListed && (
                <Badge colorScheme="green">Listed for sale</Badge>
                ) || (
                <Badge colorScheme="red">Not listed</Badge>
                )}
        {nft.priceRounded && (
            <Text fontSize="xs" fontWeight="bold">
                Price: {nft.priceRounded} CAPS
            </Text>
                )}
      </VStack>
  </MotionBox>
);

export default NFTCardHome;
