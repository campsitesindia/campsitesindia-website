import {
    ModalProvider,
    Modal,
    useModal,
    ModalTransition,
} from 'react-simple-hook-modal';

const MyComponent = () => {
    const { isModalOpen, openModal, closeModal } = useModal();

    return (
        <>
            <button onClick={openModal}>Open</button>
            <Modal
                id="any-unique-identifier"
                isOpen={isModalOpen}
                transition={ModalTransition.BOTTOM_UP}
            >
                <button onClick={closeModal}>Close</button>
            </Modal>
        </>
    );
};

const App = () => (
    <ModalProvider>
        <MyComponent />
    </ModalProvider>
);
