import { Anime } from './types';

export interface Collection {
  name: string;
  animeList: Anime[];
}

export function saveCollections(collections: Collection[]): void {
  try {
    localStorage.setItem('collections', JSON.stringify(collections));
  } catch (error) {
    console.error('Error saving collections data:', error);
  }
}

export const loadCollections = (): Collection[] => {
  const collectionsData = localStorage.getItem('collections');
  if (collectionsData) {
    try {
      const collections: Collection[] = JSON.parse(collectionsData);
      return collections;
    } catch (error) {
      console.error('Error parsing collections data:', error);
    }
  }
  return [];
};

