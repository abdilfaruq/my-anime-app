import React, { ReactNode } from 'react';
import { ModalWrapper, ModalContent, CloseButton } from '../styles/components';

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <ModalWrapper>
      <ModalContent>
        {children}
        <CloseButton onClick={onClose}>&times;</CloseButton>
      </ModalContent>
    </ModalWrapper>
  );
};

export default Modal;
