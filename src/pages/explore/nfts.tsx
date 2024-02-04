// pages/explore/nfts.tsx
import React, { useState, useEffect, useRef } from 'react';
import { GetServerSideProps } from 'next';

import { getLastListedNFTs } from '../../services/nftService';
import NFTList from '../../components/NFTList';
import SortFilterNFT from '../../components/SortFilterNFT';
import { NFTListProps } from '../../components/interfaces';

const DEFAULT_LIMIT = 24;

const ExplorePage: React.FC<NFTListProps> = ({ nfts, totalCount, sortBy }) => {
  const [loadedNfts, setLoadedNfts] = useState(nfts);
  const [offset, setOffset] = useState(DEFAULT_LIMIT);
  const sentinel = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && loadedNfts.length < totalCount) {
        fetch(`/api/nfts?limit=${DEFAULT_LIMIT}&offset=${offset}&sortBy=${sortBy}`)
          .then(res => res.json())
          .then(data => {
            setLoadedNfts(prev => [...prev, ...data.nfts]);
            setOffset(prevOffset => prevOffset + DEFAULT_LIMIT);
          })
          .catch(err => console.error("Error loading more NFTs:", err));
      }
    }, { rootMargin: '100px' });

    const currentSentinel = sentinel.current;
    if (currentSentinel) {
      observer.observe(currentSentinel);
    }

    return () => {
      if (currentSentinel) {
        observer.disconnect();
      }
    };
  }, [offset, sortBy, totalCount, loadedNfts.length]);

  return (
    <>
      <NFTList nfts={loadedNfts} totalCount={totalCount} sortBy={sortBy} />
      <div ref={sentinel} style={{ height: '20px', margin: '20px 0' }} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const sortBy = context.query.NFTSort as string || 'TIMESTAMP_LISTED_DESC';
  const { nfts, totalCount } = await getLastListedNFTs(DEFAULT_LIMIT, 0, sortBy);
  return {
    props: {
      nfts,
      totalCount,
      sortBy,
    },
  };
};

export default ExplorePage;
