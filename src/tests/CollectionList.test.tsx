import React from 'react';
import { render } from '@testing-library/react';
import CollectionList from '../components/CollectionList';

describe('CollectionList', () => {
  const mockCollections = [
    { id: '1', collectionName: 'Collection 1', coverImage: 'cover1.jpg' },
    { id: '2', collectionName: 'Collection 2', coverImage: 'cover2.jpg' },
  ];

  it('renders the collection names', () => {
    const { getByText } = render(<CollectionList collections={mockCollections} />);
    
    mockCollections.forEach((collection) => {
      const collectionName = getByText(collection.collectionName);
      expect(collectionName).toBeInTheDocument();
    });
  });

  it('renders the collection cover images', () => {
    const { getAllByRole } = render(<CollectionList collections={mockCollections} />);
    const coverImages = getAllByRole('img');

    expect(coverImages).toHaveLength(mockCollections.length);
  });
});
