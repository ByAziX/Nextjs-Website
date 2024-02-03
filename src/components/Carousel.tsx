import React, { useRef, useState, useEffect } from 'react';
import { Box, IconButton, Flex } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import NFTCard from './NFTCard';

const Carousel = ({ nfts }) => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(nfts.length > 6);

  // Supposons que la largeur de chaque NFTCard est de 260px et que la marge entre les cartes est de 16px.
  // Ajustez ces valeurs en fonction de votre mise en page réelle.
  const cardWidthWithMargin = 260 + 16; // La largeur de la carte plus la marge.
  const scrollAmount = cardWidthWithMargin * 6; // La quantité à défiler pour 6 cartes.

  const scroll = (direction) => {
    if (scrollRef.current) {
      const newScrollPosition = scrollRef.current.scrollLeft + (direction * scrollAmount);
      scrollRef.current.scrollTo({ left: newScrollPosition, behavior: 'smooth' });
    }
  };

  const checkScrollButtons = () => {
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
  };

  useEffect(() => {
    // Ajoute une fonction de vérification pour les boutons de défilement lors du montage
    checkScrollButtons();
    const scrollElement = scrollRef.current;
    // Écoutez l'événement de défilement pour ajuster l'état des boutons de navigation
    const handleScroll = () => {
      checkScrollButtons();
    };

    scrollElement.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      scrollElement.removeEventListener('scroll', handleScroll);
    };
  }, []); // Les crochets vides signifient que cet effet ne s'exécutera qu'au montage.

  return (
    <Flex alignItems="center" justifyContent="center" position="relative" w="full">
      <IconButton
        aria-label="Scroll left"
        icon={<ChevronLeftIcon />}
        isDisabled={!canScrollLeft}
        onClick={() => scroll(-1)}
        position="absolute"
        left="0"
        zIndex={2}
      />
      <Box
        ref={scrollRef}
        display="flex"
        overflowX="auto"
        w="full"
        p={2}
        scrollBehavior="smooth"
      >
        {nfts.map((nft) => (
          <Box key={nft.nftId} minWidth="260px" flex="none" mx="8px">
            <NFTCard nft={nft} />
          </Box>
        ))}
      </Box>
      <IconButton
        aria-label="Scroll right"
        icon={<ChevronRightIcon />}
        isDisabled={!canScrollRight}
        onClick={() => scroll(1)}
        position="absolute"
        right="0"
        zIndex={2}
      />
    </Flex>
  );
};

export default Carousel;
