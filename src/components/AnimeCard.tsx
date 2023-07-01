import React from 'react';

interface AnimeCardProps {
  key: string;
  title: string;
  coverImage: string;
  description: string;
}

const AnimeCard: React.FC<AnimeCardProps> = ({ key, title, coverImage, description }) => {
  return (
    <div>
      <img src={coverImage} alt={title} />
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default AnimeCard;
