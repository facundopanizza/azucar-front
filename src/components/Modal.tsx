import React, { useState } from 'react';
import ModalLibrary from 'react-modal';

interface ModalProps {
  state: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

const Modal: React.FC<ModalProps> = ({ children, state }) => {
  const [modalIsOpen, setModalIsOpen] = state;

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  ModalLibrary.setAppElement('#__next');

  return (
    <ModalLibrary
      isOpen={modalIsOpen}
      onRequestClose={(e) => {
        setModalIsOpen(false);
      }}
      style={customStyles}
      shouldCloseOnOverlayClick={true}>
      {children}
    </ModalLibrary>
  );
};

export default Modal;
