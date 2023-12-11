import React from "react";
import { CLEAR_MODAL, CLOSE_MODAL, SET_MODAL } from "./ModalReducer";
import ModalContext from "./ModalContext";

const initialState = {
  modal: undefined,
  isOpen: false,
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case SET_MODAL:
      return {
        ...state,
        modal: action.payload,
        isOpen: Boolean(action.payload),
      };
    case CLEAR_MODAL:
      return {
        ...state,
        modal: undefined,
        isOpen: false,
      };
      case CLOSE_MODAL:
        return {
          ...state,
          isOpen: false,
        };
    default:
      return state;
  }
};

export default function ModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const value = React.useMemo(() => ({ state, dispatch }), [state]);

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}
