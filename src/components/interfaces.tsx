interface AuctionEntity {
    // Define properties of AuctionEntity
  }
  
  interface CollectionEntity {
    // Define properties of CollectionEntity
  }
  
  interface RentEntity {
    // Define properties of RentEntity
  }
  
  interface MarketplaceEntity {
    // Define properties of MarketplaceEntity
  }
  
  interface TransmissionEntity {
    // Define properties of TransmissionEntity
  }
  
export interface NFTResponse {
    nftEntities: {
      totalCount: number;
      nodes: NFTEntity[];
    };
  }

export interface NFTEntity {
    nftId: string;
    auction: AuctionEntity | null;
    collection: CollectionEntity | null;
    owner: string | null;
    creator: string;
    delegatee: string | null;
    royalty: number;
    offchainData: string;
    secretOffchainData: string | null;
    capsuleOffchainData: string | null;
    isCapsule: boolean;
    isCapsuleSynced: boolean;
    isSecret: boolean;
    isSecretSynced: boolean;
    isDelegated: boolean;
    isTransmission: boolean;
    isSoulbound: boolean;
    isListed: boolean;
    isRented: boolean;
    rentee: string | null;
    rentalContract: RentEntity | null;
    price: string | null;
    priceRounded: number | null;
    marketplace: MarketplaceEntity | null;
    typeOfListing: string | null;
    transmissionRecipient: string | null;
    transmissionProtocol: TransmissionEntity | null;
    timestampCreated: Date;
    timestampBurned: Date | null;
    timestampListed: Date | null;
    timestampRented: Date | null;
    timestampSecretAdded: Date | null;
    timestampConvertedToCapsule: Date | null;
    metadata?: any;
    mediaUrl: string;
  }
  

export interface NFTListProps {
    nfts: NFT[];
    totalCount: number;
    currentPage: number;
  }

  export interface NFT {
    nftId: string;
    owner: string;
    creator: string;
    collectionId: string;
    offchainData: string;
    priceRounded: number;
    typeOfListing: string;
    isListed: boolean;
    metadata?: {
      title?: string;
      description?: string;
      image?: string;
      properties?: {
        media?: {
          hash: string;
          type: string;
          size: number;
        };
      };
    };
    mediaUrl: string;
  }
  