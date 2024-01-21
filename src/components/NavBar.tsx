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
  const bgColor = useColorModeValue('light.bg', 'dark.bg');
  const textColor = useColorModeValue('light.text', 'dark.text');

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
      <NextLink href="/explore" passHref>
            <Button >Explore</Button>
        </NextLink>
        <Button >Create</Button>
        <Button >My Collection</Button>

        <Connect />

        <DarkModeSwitch />

        <IconButton
          display={['flex', 'flex', 'none', 'none']}
          icon={<HamburgerIcon />}
          aria-label="Open Menu"
          size="lg"
        />
      </HStack>
    </Flex>
  );
};

export default NavBar;
