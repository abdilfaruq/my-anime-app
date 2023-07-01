import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CollectionDetail from '../components/CollectionDetail';

describe('CollectionDetail', () => {
  const mockCollection = {
    collectionName: 'My Collection',
    animeList: [
      { key: '1', title: 'Anime 1', coverImage: 'anime1.jpg', description: 'Description 1' },
      { key: '2', title: 'Anime 2', coverImage: 'anime2.jpg', description: 'Description 2' },
    ],
  };

  it('renders the collection title', () => {
    const { getByText } = render(
      <MemoryRouter>
        <CollectionDetail collectionName={mockCollection.collectionName} animeList={mockCollection.animeList} />
      </MemoryRouter>
    );
    const collectionTitle = getByText(mockCollection.collectionName);
    expect(collectionTitle).toBeInTheDocument();
  });

  it('renders the anime list', () => {
    const { getByText } = render(
      <MemoryRouter>
        <CollectionDetail collectionName={mockCollection.collectionName} animeList={mockCollection.animeList} />
      </MemoryRouter>
    );
    const anime1Title = getByText('Anime 1');
    const anime2Title = getByText('Anime 2');
    expect(anime1Title).toBeInTheDocument();
    expect(anime2Title).toBeInTheDocument();
  });
});
