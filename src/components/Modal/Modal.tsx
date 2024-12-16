import React from "react";
import styles from "./Modal.module.css";

type ModalProps = {
  isOpen: boolean;
  message: string;
  imageUrl: string;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  message,
  imageUrl,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <button className={styles.closeButton} onClick={onClose}>
          <img src="/close_modal.png" alt="close" className={styles.closeIcon} />
        </button>
        <img src={imageUrl} alt="Error" className={styles.image} />
        <p className={styles.message}>{message}</p>
      </div>
    </div>
  );
};

export default Modal;
