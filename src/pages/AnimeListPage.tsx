import React, { useEffect, useState } from 'react';
import { request } from '../services/api';
import { Anime } from '../services/types';
import { Collection, saveCollections, loadCollections } from '../services/storage';
import {
  Container,
  AnimeCard,
  SelectedAnimeCard,
  CollectionCard,
  Button,
  CollectionInputWrapper,
} from '../styles/components';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';

const AnimeListPage = () => {
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [selectedAnime, setSelectedAnime] = useState<Anime[]>([]);
  const [collectionName, setCollectionName] = useState('');
  const [collections, setCollections] = useState<Collection[]>(loadCollections());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const query = `
        query {
          Page {
            media(type: ANIME) {
              id
              title {
                romaji
                english
                native
              }
              genres
              coverImage {
                large
              }
            }
          }
        }
      `;

      try {
        const response = await request<{ Page?: { media: Anime[] } }>(query);
        console.log('response:', response);
        const data = (response.Page?.media || []).slice(0, 10);
        console.log('data:', data);
        setAnimeList(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleAnimeSelect = (anime: Anime) => {
    setSelectedAnime((prevState) => [...prevState, anime]);
  };

  const handleAnimeDeselect = (anime: Anime) => {
    setSelectedAnime((prevState) =>
      prevState.filter((selected) => selected.id !== anime.id)
    );
  };

  const handleCollectionNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCollectionName(event.target.value);
  };

  const handleAddToCollection = () => {
    if (selectedAnime.length === 0) return;

    const collection: Collection = {
      name: collectionName.trim(),
      animeList: selectedAnime,
    };

    const isCollectionNameValid =
      collectionName.trim() !== '' &&
      !collections.some(
        (col) =>
          col.name.toLowerCase() === collectionName.trim().toLowerCase()
      );

    if (!isCollectionNameValid) {
      alert('Please enter a valid and unique collection name.');
      return;
    }

    setCollections((prevState) => [...prevState, collection]);
    setSelectedAnime([]);
    setCollectionName('');

    saveCollections([...collections, collection]);
  };

  const handleBulkAddToCollection = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalSubmit = (selectedAnimes: Anime[], collectionName: string) => {
    if (selectedAnimes.length === 0) return;

    const collection: Collection = {
      name: collectionName.trim(),
      animeList: selectedAnimes,
    };

    const isCollectionNameValid =
      collectionName.trim() !== '' &&
      !collections.some(
        (col) =>
          col.name.toLowerCase() === collectionName.trim().toLowerCase()
      );

    if (!isCollectionNameValid) {
      alert('Please enter a valid and unique collection name.');
      return;
    }

    setCollections((prevState) => [...prevState, collection]);
    setSelectedAnime([]);
    setCollectionName('');
    setIsModalOpen(false);

    saveCollections([...collections, collection]);
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Anime List</h1>
      <Container>
        {animeList.map((anime) => (
          <AnimeCard key={anime.id}>
            <Link to={`/anime/${anime.id}`}>
              <img src={anime.coverImage.large} alt={anime.title.romaji} />
              <h3>{anime.title.romaji}</h3>
            </Link>
            <button
              onClick={() => handleAnimeSelect(anime)}
              disabled={selectedAnime.some((selected) => selected.id === anime.id)}
            >
              {selectedAnime.some((selected) => selected.id === anime.id)
                ? 'Selected'
                : 'Select'}
            </button>
          </AnimeCard>
        ))}
      </Container>
      {selectedAnime.length > 0 && (
        <div>
          <h2 style={{ textAlign: 'center' }}>Selected Anime</h2>
          <Container>
            {selectedAnime.map((selected) => (
              <SelectedAnimeCard key={selected.id}>
                <img src={selected.coverImage.large} alt={selected.title.romaji} />
                <h3>{selected.title.romaji}</h3>
                <button onClick={() => handleAnimeDeselect(selected)}>
                  Deselect
                </button>
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
            <button onClick={handleAddToCollection}>Add to Collection</button>
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

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Button onClick={handleBulkAddToCollection}>Bulk Add to Collection</Button>
      </div>
      {isModalOpen && (
        <Modal onClose={handleModalClose}>
          <h2>Bulk Add to Collection</h2>
          <Container>
            {animeList.map((anime) => (
              <AnimeCard key={anime.id}>
                <img src={anime.coverImage.large} alt={anime.title.romaji} />
                <h3>{anime.title.romaji}</h3>
                <button
                  onClick={() => handleAnimeSelect(anime)}
                  disabled={selectedAnime.some((selected) => selected.id === anime.id)}
                >
                  {selectedAnime.some((selected) => selected.id === anime.id)
                    ? 'Selected'
                    : 'Select'}
                </button>
              </AnimeCard>
            ))}
          </Container>

          <CollectionInputWrapper>
            <input
              type="text"
              placeholder="Enter collection name"
              value={collectionName}
              onChange={handleCollectionNameChange}
            />
            <Button onClick={() => handleModalSubmit(selectedAnime, collectionName)}>Add to Collection</Button>
          </CollectionInputWrapper>
        </Modal>
      )}
    </div>
  );
};

export default AnimeListPage;
