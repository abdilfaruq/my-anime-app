import React from 'react';
import AnimeCard from './AnimeCard';
import { Collection } from '../services/storage';

interface Anime {
  key: string;
  title: {
    romaji: string;
    english: string | null;
    native: string;
  };
  coverImage: {
    large: string;
  };
  description: string;
  genres: string[];
}

interface AnimeListProps {
  animeList: Anime[];
}

const AnimeList: React.FC<AnimeListProps> = ({ animeList }) => {
  return (
    <div>
      {animeList.map((anime) => (
        <AnimeCard
          key={anime.key}
          title={anime.title.romaji}
          coverImage={anime.coverImage.large}
          description={anime.description}
        />
      ))}
    </div>
  );
};

export default AnimeList;
