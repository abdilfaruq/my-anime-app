import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AnimeListPage from './pages/AnimeListPage';
import AnimeDetailPage from './pages/AnimeDetailPage';
import CollectionDetailPage from './pages/CollectionDetailPage';
import CollectionListPage from './pages/CollectionListPage';
import NotFoundPage from './pages/NotFoundPage';
import { Collection } from './services/storage';

function App() {
  const [collections, setCollections] = useState<Collection[]>([]);

  const removeCollection = (collectionName: string) => {
    setCollections((prevCollections) =>
      prevCollections.filter((collection) => collection.name !== collectionName)
    );
  };

  const openEditModal = (collectionName: string) => {
    // Implement your logic for opening the edit modal
    console.log(`Open edit modal for collection: ${collectionName}`);
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<AnimeListPage />} />
          <Route path="/anime/:id" element={<AnimeDetailPage />} />
          <Route
            path="/collection"
            element={
              <CollectionListPage
                removeCollection={removeCollection}
              />
            }
          />
          <Route path="/collection/:name" element={<CollectionDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
