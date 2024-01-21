// pages/index.tsx
import React from 'react';
import { GetServerSideProps } from 'next';

import NFTList from '../components/NFTList';
import { getLastListedNFTs } from '../services/nftService';
import { NFT } from '../components/NFTCard';

const DEFAULT_LIMIT = 24; 

interface IndexProps {
  nfts: NFT[];
  totalCount: number; 
  currentPage: number;
}

const IndexPage: React.FC<IndexProps> = ({ nfts, totalCount, currentPage }) => {
  return (
    <>
      <NFTList nfts={nfts} totalCount={totalCount} currentPage={currentPage} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const page = parseInt(context.query.page as string) || 1;
  const offset = (page - 1) * DEFAULT_LIMIT;
  const { nfts, totalCount } = await getLastListedNFTs(DEFAULT_LIMIT, offset);
  return { props: { nfts, totalCount, currentPage: page } };
};

export default IndexPage;
