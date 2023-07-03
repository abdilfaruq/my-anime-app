import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ConfirmationModal from '../components/ConfirmationModal';
import EditModal from '../components/EditModal';

interface Anime {
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
}

interface Collection {
  id: number;
  collectionName: string;
  animeList: Anime[];
}

const CollectionDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [collectionDetail, setCollectionDetail] = useState<Collection | null>(null);
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedCollectionName, setEditedCollectionName] = useState('');
  const [isCollectionNameUnique, setIsCollectionNameUnique] = useState(true);

  useEffect(() => {
    const fetchCollectionDetail = () => {
      const collectionDetailData = localStorage.getItem(`collection_${id}`);

      if (collectionDetailData) {
        setCollectionDetail(JSON.parse(collectionDetailData));
      }
    };

    fetchCollectionDetail();
  }, [id]);

  const handleRemoveAnime = (anime: Anime) => {
    setSelectedAnime(anime);
    setShowConfirmationModal(true);
  };

  const confirmRemoveAnime = () => {
    if (!collectionDetail || !selectedAnime) {
      return;
    }

    const updatedAnimeList = collectionDetail.animeList.filter(
      (anime) => anime.id !== selectedAnime.id
    );

    const updatedCollectionDetail: Collection = {
      ...collectionDetail,
      animeList: updatedAnimeList,
    };

    localStorage.setItem(`collection_${id}`, JSON.stringify(updatedCollectionDetail));

    setCollectionDetail(updatedCollectionDetail);
    setSelectedAnime(null);
    setShowConfirmationModal(false);
  };

  const handleEditCollectionName = () => {
    setShowEditModal(true);
    setEditedCollectionName(collectionDetail?.collectionName || '');
    setIsCollectionNameUnique(true);
  };

  const saveEditedCollectionName = () => {
    if (!collectionDetail) {
      return;
    }

    const isUnique = checkCollectionNameUniqueness(editedCollectionName);

    if (!isUnique) {
      setIsCollectionNameUnique(false);
      return;
    }

    const updatedCollectionDetail: Collection = {
      ...collectionDetail,
      collectionName: editedCollectionName,
    };

    localStorage.setItem(`collection_${id}`, JSON.stringify(updatedCollectionDetail));

    setCollectionDetail(updatedCollectionDetail);
    setShowEditModal(false);
  };

  const checkCollectionNameUniqueness = (name: string) => {
    const collections = Object.keys(localStorage)
      .filter((key) => key.startsWith('collection_'))
      .map((key) => localStorage.getItem(key))
      .filter((data) => data !== null)
      .map((data) => JSON.parse(data as string));

    return !collections.some((collection) => collection.collectionName === name);
  };

  if (!collectionDetail) {
    return <div>Loading...</div>;
  }

  const { collectionName, animeList } = collectionDetail;

  return (
    <div>
      <h1>Collection Detail: {collectionName}</h1>
      <button onClick={handleEditCollectionName}>Edit</button>
      <h2>Anime List:</h2>
      <ul>
        {animeList.map((anime) => (
          <li key={anime.id}>
            <Link to={`/anime/${anime.id}`}>
              <img src={anime.coverImage.large} alt={anime.title.romaji} />
              <h3>{anime.title.romaji}</h3>
            </Link>
            <button onClick={() => handleRemoveAnime(anime)}>Remove</button>
          </li>
        ))}
      </ul>
      {showConfirmationModal && (
        <ConfirmationModal
          title="Confirmation"
          message={`Are you sure you want to remove ${selectedAnime?.title.romaji}?`}
          confirmText="Remove"
          cancelText="Cancel"
          onConfirm={confirmRemoveAnime}
          onCancel={() => setShowConfirmationModal(false)}
        />
      )}
      {showEditModal && (
        <EditModal
          title="Edit Collection Name"
          initialValue={collectionName}
          confirmText="Save"
          cancelText="Cancel"
          onSave={saveEditedCollectionName}
          onCancel={() => setShowEditModal(false)}
        />
      )}
    </div>
  );
};

export default CollectionDetailPage;
