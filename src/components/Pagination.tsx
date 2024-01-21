import React from 'react';
import { Box, Button, HStack, Text } from '@chakra-ui/react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const isPageActive = (page: number) => currentPage === page;

  const generatePageNumbers = () => {
    const pagesToShow = 5; 
    const pageNumbers = [];

    if (totalPages <= pagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Calcul pour afficher les 5 pages autour de la page actuelle
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, currentPage + 2);

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
    }

    return pageNumbers;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <HStack spacing={4} justifyContent="center">
      {/* Bouton pour aller à la première page */}
      <Button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        leftIcon={<Text fontSize="xl">{"<<"}</Text>} // Flèche gauche
      >
        Première
      </Button>
      {/* Bouton pour aller à la page précédente */}
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        leftIcon={<Text fontSize="xl">{"<"}</Text>} // Flèche gauche
      >
        Précédent
      </Button>
      {/* Numéros de pages */}
      {pageNumbers.map((page) => (
        <Button
          key={page}
          variant={isPageActive(page) ? 'solid' : 'ghost'}
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      ))}
      {/* Bouton pour aller à la page suivante */}
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        rightIcon={<Text fontSize="xl">{">"}</Text>} // Flèche droite
      >
        Suivant
      </Button>
      {/* Bouton pour aller à la dernière page */}
      <Button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        rightIcon={<Text fontSize="xl">{">>"}</Text>} // Flèche droite
      >
        Dernière
      </Button>
    </HStack>
  );
};

export default Pagination;
