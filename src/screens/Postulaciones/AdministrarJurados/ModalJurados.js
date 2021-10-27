import React from 'react';
import { Modal } from 'semantic-ui-react';

export const ModalJurados = ({ openModal, setOpenModal }) => {

    const onClose = () => {
        setOpenModal(false);
    }

    return (
        <Modal 
            open={ openModal } 
            closeIcon 
            onClose={ onClose }
        >
            hola
        </Modal>
    )
}
