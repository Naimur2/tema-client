import React from "react";
// @ts-ignore
import styles from "./Modal.module.css";

interface IModalConent {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function ModalConent({
  children,
  className = "",
  style,
}: Readonly<IModalConent>) {
  const [isContentMounted, setIsContentMounted] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setIsContentMounted(true);
    }, 100);
  }, []);

  return (
    <div
      style={style}
      className={`${styles["modal-content"]} ${
        styles["modal-content-animate"]
      } ${isContentMounted ? styles["modal-enter"] : ""} ${className}`}
      onPointerDown={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );
}
