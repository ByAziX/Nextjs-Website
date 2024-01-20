// components/Footer.tsx
import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const Footer: React.FC = () => {
  return (
    <Box as="footer" py="5" textAlign="center">
      <Text>&copy; {new Date().getFullYear()} NFT Marketplace. All rights reserved.</Text>
    </Box>
  );
};

export default Footer;
