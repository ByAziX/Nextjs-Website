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
      <Button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        leftIcon={<Text fontSize="xs">{"<<"}</Text>} 
      >
      </Button>
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        leftIcon={<Text fontSize="xs">{"<"}</Text>} 
      >
      </Button>
      {pageNumbers.map((page) => (
        <Button
          key={page}
          variant={isPageActive(page) ? 'solid' : 'ghost'}
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      ))}
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        rightIcon={<Text fontSize="xs">{">"}</Text>} 
      >
      </Button>
      <Button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        rightIcon={<Text fontSize="xs">{">>"}</Text>}
      >
      </Button>
    </HStack>
  );
};

export default Pagination;
