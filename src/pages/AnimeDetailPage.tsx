import React, { useEffect, useState } from 'react';
import { request } from '../services/api';
import { useParams, Link } from 'react-router-dom';
import {
  ContainerDetail,
  AnimeCardDetail,
  Container,
  SelectedAnimeCard,
  CollectionInputWrapper,
  CollectionCard,
} from '../styles/components';

interface AnimeDetail {
  id: number;
  title: {
    romaji: string;
    english: string | null;
    native: string;
  };
  description: string;
  episodes: number;
  genres: string[];
  averageScore: number;
  coverImage: {
    large: string;
  };
}

interface Collection {
  name: string;
  animeList: AnimeDetail[];
}

const AnimeDetailPage = () => {
  const { id } = useParams();
  const [animeDetail, setAnimeDetail] = useState<AnimeDetail | null>(null);
  const [selectedAnime, setSelectedAnime] = useState<AnimeDetail[]>([]);
  const [collectionName, setCollectionName] = useState('');
  const [collections, setCollections] = useState<Collection[]>([]);

  useEffect(() => {
    const fetchAnimeDetail = async () => {
      if (id) {
        const query = `
          query {
            Media(id: ${parseInt(id)}) {
              id
              title {
                romaji
                english
                native
              }
              description
              episodes
              genres
              averageScore
              coverImage {
                large
              }
            }
          }
        `;

        try {
          const response = await request<{ Media: AnimeDetail }>(query);
          const data = response.Media;
          setAnimeDetail(data);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchAnimeDetail();
  }, [id]);

  const handleAnimeSelect = (anime: AnimeDetail) => {
    const isAnimeSelected = selectedAnime.some((selected) => selected.id === anime.id);
    if (!isAnimeSelected) {
      setSelectedAnime((prevSelectedAnime) => [...prevSelectedAnime, anime]);
    }
  };

  const handleAnimeDeselect = (anime: AnimeDetail) => {
    setSelectedAnime((prevSelectedAnime) =>
      prevSelectedAnime.filter((selected) => selected.id !== anime.id)
    );
  };

  const handleCollectionNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCollectionName(event.target.value);
  };

  const handleModalSubmit = (selectedAnime: AnimeDetail[], collectionName: string) => {
    const newCollection: Collection = {
      name: collectionName,
      animeList: selectedAnime,
    };

    const storedCollections = localStorage.getItem('collections');
    let updatedCollections: Collection[] = [];
    if (storedCollections) {
      updatedCollections = JSON.parse(storedCollections);
    }

    updatedCollections.push(newCollection);

    localStorage.setItem('collections', JSON.stringify(updatedCollections));

    setSelectedAnime([]);
    setCollectionName('');

    window.location.href = '/collection';
  };

  if (!animeDetail) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'gray' }}>Loading...</div>
      </div>
    );
  }

  const {
    title,
    description,
    episodes,
    genres,
    averageScore,
    coverImage,
  } = animeDetail;

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>
        <Link to="/">Anime Detail</Link>
      </h1>
      <ContainerDetail>
        <AnimeCardDetail>
          <img src={coverImage.large} alt={title.romaji} />
          <h2>{title.romaji}</h2>
          {title.english && <h3>{title.english}</h3>}
          <p>{description}</p>
          <p>Episodes: {episodes}</p>
          <p>Genres: {genres.join(', ')}</p>
          <p>Rating: {averageScore}</p>
          <button
            onClick={() => handleAnimeSelect(animeDetail)}
            disabled={selectedAnime.some((selected) => selected.id === animeDetail.id)}
          >
            Add to Collection
          </button>
        </AnimeCardDetail>
      </ContainerDetail>
      {selectedAnime.length > 0 && (
        <div>
          <h2 style={{ textAlign: 'center' }}>Selected Anime</h2>
          <Container>
            {selectedAnime.map((selected) => (
              <SelectedAnimeCard key={selected.id}>
                <img src={selected.coverImage.large} alt={selected.title.romaji} />
                <h3>{selected.title.romaji}</h3>
                <button onClick={() => handleAnimeDeselect(selected)}>Deselect</button>
              </SelectedAnimeCard>
            ))}
          </Container>
          <CollectionInputWrapper>
            <input
              type="text"
              placeholder="Enter collection name"
              value={collectionName}
              onChange={handleCollectionNameChange}
            />
            <button onClick={() => handleModalSubmit(selectedAnime, collectionName)}>
              Add to Collection
            </button>
          </CollectionInputWrapper>
        </div>
      )}
      {collections.length > 0 && (
        <div>
          <Link to="/collection">
            <h1 style={{ textAlign: 'center' }}>Collections</h1>
          </Link>
          <Container>
            {collections.map((collection) => (
              <CollectionCard key={collection.name}>
                <Link to={`/collection/${collection.name}`}>
                  <h3>{collection.name}</h3>
                  <ul>
                    {collection.animeList.map((anime) => (
                      <li key={anime.id}>
                        <img src={anime.coverImage.large} alt={anime.title.romaji} />
                        <h3>{anime.title.romaji}</h3>
                      </li>
                    ))}
                  </ul>
                </Link>
              </CollectionCard>
            ))}
          </Container>
        </div>
      )}
    </div>
  );
};

export default AnimeDetailPage;
