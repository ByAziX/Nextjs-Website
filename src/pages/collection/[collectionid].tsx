import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Box, Text, VStack, Image, useColorModeValue, Link, HStack, Badge } from '@chakra-ui/react';

const CollectionDetailsPage = () => {
  const router = useRouter();
  const { collectionID } = router.query;
  const [collection, setCollection] = useState(null);
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');

  useEffect(() => {
      // Simuler l'appel API
      setCollection({
        name: 'Nom de la Collection',
        description: 'Description de la collection...',
        bannerUrl: 'https://via.placeholder.com/500',
        logoUrl: 'https://via.placeholder.com/100',
        nbNfts: 120, // Nombre de NFTs dans la collection
        isClosed: true, // État de la collection
        owner: 'Propriétaire de la Collection',
        social: {
          facebook: 'https://facebook.com',
          twitter: 'https://twitter.com',
          discord: 'https://discord.com',
        },
        nfts: [
          // Liste des NFTs, simulée pour cet exemple
          { name: 'NFT #1', imageUrl: 'https://via.placeholder.com/150' },
          { name: 'NFT #2', imageUrl: 'https://via.placeholder.com/150' },
          // Ajouter plus si nécessaire
        ],
      });
    }
  , [collectionID]);



  return (
    <Box bg={bgColor} color={textColor} p={5}>
      <VStack spacing={4} align="stretch">
        <HStack justify="space-between">
          <Text fontSize="2xl" fontWeight="bold">{collection?.name}</Text>
          <Badge colorScheme={collection?.isClosed ? "red" : "green"}>
            {collection?.isClosed ? 'Fermée' : 'Ouverte'}
          </Badge>
        </HStack>
        <Image src={collection?.bannerUrl} alt={`Bannière de ${collection?.name}`} />
        <Image src={collection?.logoUrl} alt={`Logo de ${collection?.name}`} boxSize="100px" alignSelf="center" />
        <Text>{collection?.description}</Text>
        <Text>Nombre de NFTs: {collection?.nbNfts}</Text>
        <Text>Propriétaire: {collection?.owner}</Text>
        <HStack>
  {collection?.social?.facebook && <Link href={collection?.social?.facebook} isExternal>Facebook</Link>}
  {collection?.social?.twitter && <Link href={collection?.social?.twitter} isExternal>Twitter</Link>}
  {collection?.social?.discord && <Link href={collection?.social?.discord} isExternal>Discord</Link>}
</HStack>

        <VStack>
          {collection?.nfts?.map((nft, index) => (
            <Box key={index} p={3} shadow="md" borderWidth="1px" borderRadius="lg" overflow="hidden">
              <Image src={nft.imageUrl} alt={nft.name} />
              <Text mt={2}>{nft.name}</Text>
            </Box>
          ))}
        </VStack>
      </VStack>
    </Box>
  );
};

export default CollectionDetailsPage;
