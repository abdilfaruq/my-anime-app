import React from 'react';
import { render } from '@testing-library/react';
import AnimeList from '../components/AnimeList';

const animeListData = [
  {
    key: '1',
    title: {
      romaji: 'Anime 1',
      english: null,
      native: 'Anime 1',
    },
    coverImage: {
      large: 'image1.jpg',
    },
    description: 'Description 1',
    genres: [],
  },
  {
    key: '2',
    title: {
      romaji: 'Anime 2',
      english: null,
      native: 'Anime 2',
    },
    coverImage: {
      large: 'image2.jpg',
    },
    description: 'Description 2',
    genres: [],
  },
  {
    key: '3',
    title: {
      romaji: 'Anime 3',
      english: null,
      native: 'Anime 3',
    },
    coverImage: {
      large: 'image3.jpg',
    },
    description: 'Description 3',
    genres: [],
  },
];

test('renders anime list', () => {
  const { getByText } = render(<AnimeList animeList={animeListData} />);
  const anime1Title = getByText('Anime 1');
  const anime2Title = getByText('Anime 2');
  const anime3Title = getByText('Anime 3');

  expect(anime1Title).toBeInTheDocument();
  expect(anime2Title).toBeInTheDocument();
  expect(anime3Title).toBeInTheDocument();
});
