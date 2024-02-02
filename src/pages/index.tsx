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

const MotionBox = motion(Box);

const Feature = ({ title, icon, children, ...props }) => (
  <VStack
    as={MotionBox}
    whileHover={{ scale: 1.05 }}
    bg={useColorModeValue('white', 'gray.800')}
    p={5}
    rounded="lg"
    borderWidth="1px"
    _hover={{ shadow: 'xl' }}
    transition="all 0.3s ease-out"
    {...props}
  >
    <Icon as={icon} w={8} h={8} color={useColorModeValue('teal.500', 'teal.200')} />
    <Heading size="md">{title}</Heading>
    <Text>{children}</Text>
  </VStack>
);

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
        {currentBid} ETH
      </Box>
    </Flex>
  </MotionBox>
);
// NFT Collection Preview Component
const NFTCollectionPreview = ({ title, image, description }) => (
  <GridItem colSpan={{ base: 2, md: 1 }} as={MotionBox} whileHover={{ scale: 1.05 }} transition="all 0.3s ease-out">
    <Image src={image} alt={title} borderRadius="md" mb={4} />
    <Heading size="md" mb={2}>{title}</Heading>
    <Text fontSize="sm">{description}</Text>
  </GridItem>
);

// Section Tools Available on the Site
const SiteTools = () => (
  <Box py={10}>
    <Heading size="lg" textAlign="center" my={10}>
      Tools Available
    </Heading>
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
      <ToolFeature
        title="Sentinel Battle Delegation"
        icon={FaUserShield}
        description="Delegate your sentinels to participate in battles, earning rewards and enhancing your strategic position."
      />
      <ToolFeature
        title="Node Rental"
        icon={FaCoins}
        description="Rent sentinel nodes to increase your network presence and earn passive income through system rewards."
      />
      <ToolFeature
        title="Market Analytics"
        icon={FaChartLine}
        description="Access comprehensive market analytics to make informed decisions and optimize your sentinel deployments."
      />
      {/* Other tools can be added here */}
    </SimpleGrid>
  </Box>
);

// ToolFeature Component for individual tools
const ToolFeature = ({ title, icon, description }) => (
  <VStack
    as={MotionBox}
    whileHover={{ scale: 1.05 }}
    transition="all 0.3s ease-out"
    bg={useColorModeValue('white', 'gray.800')}
    p={5}
    rounded="lg"
    borderWidth="1px"
    shadow="lg"
  >
    <Icon as={icon} w={10} h={10} color={useColorModeValue('teal.500', 'teal.200')} />
    <Heading size="md">{title}</Heading>
    <Text>{description}</Text>
  </VStack>
);


const IndexPage = () => {
  const bgColor = useColorModeValue('light.bg', 'dark.bg');
  const textColor = useColorModeValue('light.text', 'dark.text');

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
            image="/nft-marketplace-background.webp"
            title="A. Jordan"
            currentBid="1.5"
          />
        </Box>
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
      <SiteTools />


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
