import React from 'react';
import {
  Flex, Box, Text, Button, Spacer, HStack, useColorModeValue, IconButton, Link
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { DarkModeSwitch } from './DarkModeSwitch';
import dynamic from 'next/dynamic';
import NextLink from 'next/link';

const Connect = dynamic(() => import('./Connect').then(m => m.Connect), {
  ssr: false,
});

const NavBar: React.FC = () => {
  const bgColor = useColorModeValue('gray.100', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'white');

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

      <HStack spacing={4}>
      <NextLink href="/_explore" passHref>
            <Button colorScheme="teal" variant="ghost">Explore</Button>
        </NextLink>
        <Button colorScheme="teal" variant="ghost">Create</Button>
        <Button colorScheme="teal" variant="ghost">My Collection</Button>

        <Connect />

        <DarkModeSwitch />

        <IconButton
          display={['flex', 'flex', 'none', 'none']}
          icon={<HamburgerIcon />}
          aria-label="Open Menu"
          size="lg"
          variant="ghost"
          colorScheme="teal"
        />
      </HStack>
    </Flex>
  );
};

export default NavBar;
