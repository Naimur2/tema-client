import { createContext } from "react";
import { TModal } from "./ModalReducer";

type ModalState = {
    modal?: TModal;
    isOpen?: boolean;
};

export type ModalContextType = {
    state: ModalState;
    dispatch: React.Dispatch<any>;
};

const ModalContext = createContext<ModalContextType>({
    state: {},
    dispatch: () => {},
});

export default ModalContext;
