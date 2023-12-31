import React, { useState } from 'react';
import Modal from 'react-modal';
import { Collection } from '../services/storage';

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
