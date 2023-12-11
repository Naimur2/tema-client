import { TModals } from "modal/components/ModalWrapper";
import ModalContext from "modal/state/ModalContext";
import { setModal } from "modal/state/ModalReducer";
import React from "react";

export default function useModal<T>() {
    const { state, dispatch } = React.useContext(ModalContext);

    const openModal = React.useCallback(
        (name: TModals, props?: T) => {
            dispatch(setModal({ name, props }));
        },
        [dispatch]
    );

    const closeModal = React.useCallback(() => {
        dispatch(setModal(undefined));
    }, [dispatch]);

    const isOpen = React.useCallback(
        (name: TModals) => {
            return state?.modal?.name === name;
        },
        [state?.modal?.name]
    );

    return {
        openModal,
        closeModal,
        modal: state?.modal as {
            name: TModals;
            props: T;
        },
        isOpen,
        isModalOpen: state?.isOpen,
    };
}
