import { extendTheme, ThemeConfig } from '@chakra-ui/react';

// Configuration du thème
const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

// Couleurs personnalisées
const colors = {
  brand: {
    50: '#e3f2fd',
    100: '#bbdefb',
    200: '#90caf9',
    300: '#64b5f6',
    400: '#42a5f5',
    500: '#2196f3', // Couleur principale de la marque
    600: '#1e88e5',
    700: '#1976d2',
    800: '#1565c0',
    900: '#0d47a1',
  },
  // Ajoutez d'autres palettes de couleurs si nécessaire
};

// Styles de boutons personnalisés
const Button = {
  baseStyle: {
    fontWeight: 'bold',
    borderRadius: 'md', // boutons avec coins arrondis
  },
  sizes: {
    sm: {
      fontSize: 'sm',
      px: 4, // padding horizontal
      py: 2, // padding vertical
    },
    md: {
      fontSize: 'md',
      px: 6,
      py: 3,
    },
    // Ajoutez d'autres tailles si nécessaire
  },
  variants: {
    solid: {
      bg: 'brand.500',
      color: 'white',
      _hover: {
        bg: 'brand.600',
      },
      _active: {
        bg: 'brand.700',
      },
    },
    // Ajoutez d'autres variantes si nécessaire
  },
  // Ajoutez defaultProps si nécessaire
};

// Polices personnalisées
const fonts = {
  heading: '"Avenir Next", sans-serif',
  body: '"Roboto", sans-serif',
};

const theme = extendTheme({ config, colors, components: { Button }, fonts });

export default theme;
