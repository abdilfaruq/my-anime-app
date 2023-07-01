import React from 'react';

interface Collection {
  id: string;
  collectionName: string;
  coverImage: string;
}

interface CollectionListProps {
  collections: Collection[];
}

const CollectionList: React.FC<CollectionListProps> = ({ collections }) => {
  return (
    <div>
      {collections.map((collection) => (
        <div key={collection.id}>
          <h3>{collection.collectionName}</h3>
          <img src={collection.coverImage} alt={collection.collectionName} />
        </div>
      ))}
    </div>
  );
};

export default CollectionList;
