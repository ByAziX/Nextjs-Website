import React from 'react';
import {
  Flex, Box, Text, Button, Spacer, useColorModeValue, IconButton,
  VStack, useDisclosure, Center, Image, Input
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, SearchIcon } from '@chakra-ui/icons';
import { DarkModeSwitch } from './DarkModeSwitch';
import dynamic from 'next/dynamic';
import NextLink from 'next/link';
import { FaHome, FaUserCircle, FaBoxOpen } from 'react-icons/fa';
import WalletModal from '../modals/WalletModal';
import SearchBar from './SearchBar';

const Connect = dynamic(() => import('./Connect').then(m => m.Connect), {
  ssr: false,
});

const NavBar: React.FC = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue('light.bg', 'dark.bg');
  const textColor = useColorModeValue('light.text', 'dark.text');
  const buttonHoverBg = useColorModeValue('purple.500', 'purple.200');
  const buttonActiveBg = useColorModeValue('purple.700', 'purple.400');

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1rem"
      bg={bgColor}
      color={textColor}
    >
      <Flex align="center">
        <NextLink href="/" passHref>
          <Flex align="center" cursor="pointer">
            <Image src="./nft-marketplace-background.webp" alt="Logo" boxSize="30px" mr="3" />
            <Text fontSize="xl" fontWeight="bold" mr="5">
              NFT Marketplace
            </Text>
          </Flex>
        </NextLink>
      </Flex>

      {/* Barre de recherche complète pour les écrans plus grands */}
      <Box flex="1" display={{ base: 'none', md: 'block' }}>
        <Center>
          <SearchBar onSearch={(query) => console.log('Searching for:', query)} />
        </Center>
      </Box>

      <IconButton
        display={['flex', 'flex', 'none', 'none']}
        onClick={isOpen ? onClose : onOpen}
        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
        aria-label="Open Menu"
        size="lg"
      />

      {/* Barre de recherche pour les appareils mobiles */}
      <Box
        display={[isOpen ? 'block' : 'none', isOpen ? 'block' : 'none', 'none', 'none']}
        flexBasis={{ base: "100%", md: "auto" }}
        mt={[4, 4, 0, 0]}
      >
          <SearchBar onSearch={(query) => console.log('Searching for:', query)} />
      </Box>
      

      <Flex
        flexBasis={{ base: "100%", md: "auto" }}
        display={[isOpen ? "flex" : "none", isOpen ? "flex" : "none", "flex", "flex"]}
        ml={[0, 0, 5]}
        align="center"
        justify={[isOpen ? "center" : "space-between", isOpen ? "center" : "space-between", "space-between", "space-between"]}
        direction={["column", "column", "row", "row"]}
        pt={[4, 4, 0, 0]}
        gap={5}
      >
        <NextLink href="/explore" passHref>
          <Button leftIcon={<FaBoxOpen />} _hover={{ bg: buttonHoverBg }} _active={{ bg: buttonActiveBg }}>Explore</Button>
        </NextLink>
        <Button leftIcon={<FaUserCircle />} _hover={{ bg: buttonHoverBg }} _active={{ bg: buttonActiveBg }}>Create</Button>
        <Button leftIcon={<FaHome />} _hover={{ bg: buttonHoverBg }} _active={{ bg: buttonActiveBg }}>My Collection</Button>
        <Connect />
        <DarkModeSwitch />
      </Flex>
    </Flex>
  );
};

export default NavBar;
