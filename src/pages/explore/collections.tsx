// pages/index.tsx
import React from 'react';
import { GetServerSideProps } from 'next';
import { getCollections } from '../../services/nftService';
import CollectionList from '../../components/CollectionList';
import { CollectionListProps } from '../../components/interfaces';

const DEFAULT_LIMIT = 24; 

const explorePage: React.FC<CollectionListProps> = ({ collections, totalCount, currentPage }) => {
  return (
    <>
      <CollectionList collections={collections} totalCount={totalCount} currentPage={currentPage} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const page = parseInt(context.query.page as string) || 1;
  const offset = (page - 1) * DEFAULT_LIMIT;
  const { collections, totalCount } = await getCollections(DEFAULT_LIMIT, offset);
  return { props: { collections, totalCount, currentPage: page } };
};

export default explorePage;
