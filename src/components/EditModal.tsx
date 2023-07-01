import React, { useState } from 'react';

interface EditModalProps {
  title: string;
  initialValue: string;
  confirmText: string;
  cancelText: string;
  onSave: (value: string) => void;
  onCancel: () => void;
}

const EditModal: React.FC<EditModalProps> = ({
  title,
  initialValue,
  confirmText,
  cancelText,
  onSave,
  onCancel,
}) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSave = () => {
    onSave(value);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>{title}</h3>
        <input type="text" value={value} onChange={handleChange} />
        <div className="modal-actions">
          <button onClick={onCancel}>{cancelText}</button>
          <button onClick={handleSave}>{confirmText}</button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
