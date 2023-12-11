export type TModal = {
    name: string;
    props: any;
};

export const SET_MODAL = "SET_MODAL";
export const CLEAR_MODAL = "CLEAR_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";

export const setModal = (modal?: TModal) => {
    return {
        type: SET_MODAL,
        payload: modal,
    };
};

export const clearModal = () => {
    return {
        type: CLEAR_MODAL,
    };
};

export const closeModal = () => {
    return {
        type: CLOSE_MODAL,
    };
};
