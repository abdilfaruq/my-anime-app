export interface Anime {
  id: number;
  title: {
    romaji: string;
    english: string | null;
    native: string;
  };
  genres: string[];
  coverImage: {
    large: string;
  };
  description: string;
  episodes: number;
  rating: number;
}
