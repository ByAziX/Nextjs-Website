import React from 'react';
import {
  Flex, Box, Text, Button, Spacer, useColorModeValue, IconButton,
  VStack, useDisclosure, Center
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { DarkModeSwitch } from './DarkModeSwitch';
import dynamic from 'next/dynamic';
import NextLink from 'next/link';
import { FaHome, FaUserCircle, FaBoxOpen } from 'react-icons/fa'; // Example icons
import WalletModal from '../modals/WalletModal';

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
      <Box>
        <NextLink href="/" passHref>
          <Text fontSize="xl" fontWeight="bold" cursor="pointer">
            NFT Marketplace
          </Text>
        </NextLink>
      </Box>

      <Spacer />

      <IconButton
        display={['flex', 'flex', 'none', 'none']}
        onClick={isOpen ? onClose : onOpen}
        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
        aria-label="Open Menu"
        size="lg"
      />

<Box flexBasis={{ base: "100%", md: "auto" }}>
    <Flex
      display={[isOpen ? "flex" : "none", isOpen ? "flex" : "none", "flex", "flex"]}
      ml={[0, 0, 10]}
      align="center"
      justify={[isOpen ? "center" : "space-between", isOpen ? "center" : "space-between", "space-between", "space-between"]}
      direction={["column", "column", "row", "row"]}
      pt={[4, 4, 0, 0]}
      gap={4}
    >
      {/* Pour le mode hamburger (écrans petits), les boutons sont empilés verticalement et centrés */}
      {/* Sur les écrans plus larges, ils sont alignés en ligne */}
      <NextLink href="/explore" passHref>
        <Button leftIcon={<FaBoxOpen />} _hover={{ bg: buttonHoverBg }} _active={{ bg: buttonActiveBg }}>Explore</Button>
      </NextLink>
      <Button leftIcon={<FaUserCircle />} _hover={{ bg: buttonHoverBg }} _active={{ bg: buttonActiveBg }}>Create</Button>
      <Button leftIcon={<FaHome />} _hover={{ bg: buttonHoverBg }} _active={{ bg: buttonActiveBg }}>My Collection</Button>

      <Connect />
      <DarkModeSwitch />
    </Flex>
  </Box>
</Flex>
  );
};

export default NavBar;
