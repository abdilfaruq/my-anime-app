import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { loadCollections, saveCollections, Collection } from '../services/storage';
import EditCollectionModal from '../components/EditCollectionModal';
import {
  Container,
  CollectionCard,
  ButtonCollections,
  NoCollections
} from '../styles/components';

interface CollectionListPageProps {
  removeCollection: (collectionName: string) => void;
}

const CollectionListPage: React.FC<CollectionListPageProps> = ({ removeCollection }) => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editCollectionName, setEditCollectionName] = useState('');

  useEffect(() => {
    const loadedCollections = loadCollections();
    setCollections(loadedCollections);
  }, []);

  const handleRemoveCollection = (collectionName: string) => {
    removeCollection(collectionName);
    const updatedCollections = collections.filter(collection => collection.name !== collectionName);
    setCollections(updatedCollections);
    saveCollections(updatedCollections);
  };

  const handleOpenEditModal = (collectionName: string) => {
    setEditCollectionName(collectionName);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
  };

  const handleEditCollection = (collectionName: string, newName: string) => {
    console.log(`Edit collection: ${collectionName} -> ${newName}`);
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>
        <Link to="/">Collection List</Link>
      </h1>
      <Container>
        {collections.length > 0 ? (
          <div>
            {collections.map((collection) => (
              <CollectionCard key={collection.name}>
                <Link to={`/collection/${collection.name}`}>
                  <h3>{collection.name}</h3>
                </Link>
                {collection.animeList.map((anime) => (
                  <div key={anime.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img src={anime.coverImage.large} alt={anime.title.romaji} style={{ width: '200px', height: '200px', objectFit: 'cover' }} />
                    <h3 style={{ textAlign: 'center' }}>{anime.title.romaji}</h3>
                  </div>
                ))}
                <ButtonCollections onClick={() => handleRemoveCollection(collection.name)}>
                  Remove
                </ButtonCollections>
                <ButtonCollections onClick={() => handleOpenEditModal(collection.name)}>
                  Edit
                </ButtonCollections>
              </CollectionCard>
            ))}
          </div>
        ) : (
          <NoCollections>No collections found.</NoCollections>
        )}
        {editModalOpen && (
          <EditCollectionModal
            collectionName={editCollectionName}
            editCollection={handleEditCollection}
            closeModal={handleCloseEditModal}
            collections={collections}
          />
        )}
      </Container>
    </div>
  );
};

export default CollectionListPage;
