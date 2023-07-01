import React, { useState } from 'react';
import Modal from 'react-modal';
import { Collection, saveCollections } from '../services/storage';

interface EditCollectionModalProps {
  collectionName: string;
  editCollection: (collectionName: string, newName: string) => void;
  closeModal: () => void;
  collections: Collection[];
}

const EditCollectionModal: React.FC<EditCollectionModalProps> = ({
  collectionName,
  editCollection,
  closeModal,
  collections,
}) => {
  const [newName, setNewName] = useState(collectionName);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  const handleSubmit = () => {
    if (newName.trim() !== '') {
      editCollection(collectionName, newName);
      closeModal();

      // Perbarui koleksi dengan nama baru
      const updatedCollections = collections.map((collection) => {
        if (collection.name === collectionName) {
          return { ...collection, name: newName };
        }
        return collection;
      });

      saveCollections(updatedCollections); // Menyimpan koleksi ke localStorage setelah berhasil mengedit
    }
  };

  return (
    <Modal isOpen={true} onRequestClose={closeModal}>
      <h2>Edit Collection</h2>
      <input type="text" value={newName} onChange={handleInputChange} />
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={closeModal}>Cancel</button>
    </Modal>
  );
};

export default EditCollectionModal;
