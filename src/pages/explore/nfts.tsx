import React from 'react';
import { GetServerSideProps } from 'next';

import { getLastListedNFTs } from '../../services/nftService';
import NFTList from '../../components/NFTList';
import { NFTListProps } from '../../components/interfaces';
import SortFilterNFT from '../../components/SortFilterNFT';

const DEFAULT_LIMIT = 24;

const ExplorePage: React.FC<NFTListProps> = ({ nfts, totalCount, currentPage, sortBy }) => {
  return (
    <>
      <NFTList nfts={nfts} totalCount={totalCount} currentPage={currentPage} sortBy={sortBy} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const page = parseInt(context.query.page as string) || 1;
  const sortBy = context.query.NFTSort as string || 'TIMESTAMP_LISTED_DESC';
  const offset = (page - 1) * DEFAULT_LIMIT;
  const { nfts, totalCount } = await getLastListedNFTs(DEFAULT_LIMIT, offset, sortBy);
  return {
    props: {
      nfts,
      totalCount,
      currentPage: page,
      sortBy // Ajoutez sortBy aux props pour le conserver dans le composant
    },
  };
};

export default ExplorePage;
