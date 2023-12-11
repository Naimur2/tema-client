import { useEffect, useRef, useState } from "react";
import Portal from "./Portal";
// @ts-ignore
import useModal from "modal/hook/useModal";
// @ts-ignore
import styles from "./Modal.module.css";
import ModalConent from "./ModalConent";
import ModalHeader from "./ModalHeader";
import { TModals } from "./ModalWrapper";

interface IModal {
  isOpen?: boolean;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  modalId?: TModals;
  closeOnBackdropClick?: boolean;
}

export default function Modal({
  isOpen: isOpenFrom,
  children,
  className = "",
  style = {},
  modalId,
  closeOnBackdropClick = true,
}: Readonly<IModal>) {
  const [showModal, setShowModal] = useState(false);
  const backdropRef = useRef<HTMLDivElement>(null);
  const { isOpen: checkIsOpen, closeModal } = useModal();

  const isOpen = modalId ? checkIsOpen(modalId) : isOpenFrom;

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    closeModal();
  };

  const handleEscape: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === "Escape") {
      handleClose(e as any);
    }
  };

  useEffect(() => {
    const backdrop = backdropRef.current;
    if (backdrop) {
      //  stop scrollng without moving the screen to the top
      if (isOpen) {
        backdrop.style.display = "flex";
        backdrop.scrollTop = window.scrollY;
      } else {
        backdrop.style.display = "none";
        window.scrollTo(0, backdrop.scrollTop);
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setShowModal(true);
    } else {
      setTimeout(() => {
        setShowModal(false);
      }, 500);
    }
  }, [isOpen]);

  return (
    <Portal containerId="modal">
      {showModal && (
        <>
          <div
            style={style}
            className={`${styles["modal-backdrop"]} ${
              styles["modal-backrop-animate"]
            } ${showModal ? styles["open"] : ""} ${className}`}
            onClick={closeOnBackdropClick ? handleClose : undefined}
            onPointerDown={(e) => e.stopPropagation()}
            onKeyDown={handleEscape}
            ref={backdropRef}
          ></div>
          {children}
        </>
      )}
    </Portal>
  );
}

Modal.Content = ModalConent;
Modal.Header = ModalHeader;
