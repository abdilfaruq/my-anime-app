import React from 'react';
import AnimeCard from '../components/AnimeCard';

interface CollectionDetailProps {
  collectionName: string;
  animeList: {
    key: string;
    title: string;
    coverImage: string;
    description: string; // Add the description prop
  }[];
}

const CollectionDetail: React.FC<CollectionDetailProps> = ({ collectionName, animeList }) => {
  return (
    <div>
      <h1>{collectionName}</h1>
      {animeList.map((anime) => (
        <AnimeCard
          key={anime.key}
          title={anime.title}
          coverImage={anime.coverImage}
          description={anime.description}
        />
      ))}
    </div>
  );
};

export default CollectionDetail;
