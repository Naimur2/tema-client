import React, { useContext, useEffect } from "react";

import modals from "modal/index";
import ModalContext from "modal/state/ModalContext";
import ModalProvider from "modal/state/ModalProvider";

export type TModals = keyof typeof modals;

function RenderModal() {
    const { state } = useContext(ModalContext);
    const Component = modals?.[state?.modal?.name as TModals] as React.FC<any>;

    useEffect(() => {
        const body = document.querySelector("body");
        if (body) {
            if (state?.modal) {
                body.style.overflow = "hidden";
            } else {
                body.style.overflow = "auto";
            }
        }
    }, [state?.modal]);

    return Component ? <Component {...state?.modal?.props} /> : null;
}

const ModalWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <ModalProvider>
            {children}
            <RenderModal />
        </ModalProvider>
    );
};

export default ModalWrapper;
