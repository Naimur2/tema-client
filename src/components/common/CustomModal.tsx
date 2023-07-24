import { Button, Modal } from "flowbite-react";
import { useState, ReactNode } from "react";

interface IRenderPropsChildrenProps {
  openModal?: string | undefined;
  setOpenModal?: React.Dispatch<React.SetStateAction<"default" | undefined>>;
}

type TRenderPropsChildren = (props: IRenderPropsChildrenProps) => ReactNode;

interface ICustomModalProps {
  children: TRenderPropsChildren | React.ReactNode;
  trigger: JSX.Element;
  title: string;
}

export default function CustomModal({
  children,
  trigger,
  title,
}: ICustomModalProps) {
  const [openModal, setOpenModal] = useState<"default" | undefined>();
  console.log("type of children: ", typeof children);

  return (
    <>
      <span onClick={() => setOpenModal("default")}>{trigger}</span>
      <Modal
        show={openModal === "default"}
        onClose={() => setOpenModal(undefined)}
      >
        <Modal.Header>{title}</Modal.Header>
        <Modal.Body>
          {typeof children === "function"
            ? children({ openModal, setOpenModal })
            : children}
        </Modal.Body>
      </Modal>
    </>
  );
}
// children({ openModal, setOpenModal })
