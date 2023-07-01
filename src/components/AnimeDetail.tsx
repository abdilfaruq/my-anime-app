import React from 'react';
import { useRouter } from 'next/router';
import { Anime } from '../services/types';
import { Button } from '../styles/components';

interface AnimeDetailProps {
  anime: Anime;
  addToCollection: (anime: Anime) => void;
  isInCollection: (anime: Anime) => boolean;
}

const AnimeDetail: React.FC<AnimeDetailProps> = ({ anime, addToCollection, isInCollection }) => {
  const router = useRouter();

  const handleAddToCollection = () => {
    addToCollection(anime);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div>
      <img src={anime.coverImage.large} alt={anime.title.romaji} />
      <h2>{anime.title.romaji}</h2>
      <p>{anime.description}</p>
      <p>Number of Episodes: {anime.episodes}</p>
      <p>Genres: {anime.genres.join(', ')}</p>
      <p>Rating: {anime.rating}</p>

      {isInCollection(anime) ? (
        <Button disabled>This anime is already in a collection</Button>
      ) : (
        <Button onClick={handleAddToCollection}>Add to Collection</Button>
      )}

      <Button onClick={handleBack}>Go Back</Button>
    </div>
  );
};

export default AnimeDetail;
