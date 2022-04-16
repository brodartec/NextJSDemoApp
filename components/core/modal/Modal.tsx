import React, { useCallback } from "react";
import styles from "./Modal.module.css";

type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
};
const Modal = ({ children, onClose }: ModalProps) => {
  const handleBackdropClicked = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleContentsClicked = useCallback(
    // prevent modal from closing if user clicks on the content
    (e: React.MouseEvent) => e.stopPropagation(),
    []
  );
  return (
    <div className={styles.modal} onClick={handleBackdropClicked}>
      <div onClick={handleContentsClicked}>{children}</div>
    </div>
  );
};

export default Modal;
