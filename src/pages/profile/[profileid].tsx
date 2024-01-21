// pages/explore/[profileid].tsx
import React from 'react';
import { GetServerSideProps } from 'next';
import { getNFTfromOwner } from '../../services/nftService';
import NFTList from '../../components/NFTList';
import {NFTListProps } from '../../components/interfaces'


const ProfilePage: React.FC<NFTListProps> = ({ nfts, totalCount, currentPage }) => {
  return (
    <div>
      <NFTList nfts={nfts} totalCount={totalCount} currentPage={currentPage} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query, params } = context;
  const page = parseInt(query.page as string) || 1;
  const limit = 24; 
  const offset = (page - 1) * limit;

  try {
    const owner = params.profileid as string;
    const { nfts, totalCount } = await getNFTfromOwner(owner, limit, offset);

    return {
      props: {
        nfts,
        totalCount,
        currentPage: page,
      },
    };
  } catch (error) {
    console.error('Error fetching NFTs:', error);
    return {
      props: {
        nfts: [],
        totalCount: 0,
        currentPage: page,
      },
    };
  }
};

export default ProfilePage;
