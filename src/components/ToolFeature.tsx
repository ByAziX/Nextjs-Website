import React from 'react';
import { Box, Heading, Text, Icon, VStack, useColorModeValue} from '@chakra-ui/react';
import { motion } from 'framer-motion';

// Conversion de Box en MotionBox pour les animations
const MotionBox = motion(Box);

const ToolFeature = ({ title, icon, description }) => (
  <VStack
    as={MotionBox}
    whileHover={{ scale: 1.05 }}
    transition="all 0.3s ease-out"
    bg={useColorModeValue('white', 'gray.800')} // Utilisez `useColorModeValue('white', 'gray.800')` pour le thème sombre
    p={5}
    rounded="lg"
    borderWidth="1px"
    shadow="lg"
    align="center"
    justify="center"
  >
    <Icon as={icon} w={10} h={10} color="purple.500" /> {/* Ajustez la couleur selon le thème */}
    <Heading size="md" textAlign="center">{title}</Heading>
    <Text textAlign="center">{description}</Text>
  </VStack>
);

export default ToolFeature;
