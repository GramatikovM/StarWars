import type { Button } from "../../../../to-do-list/src/types";
import styles from "./Button.module.css";

const Button: React.FC<Button> = ({ text, onClick, isRed, className }) => {
  return (
    <button
      className={`${styles.button} ${isRed ? styles.buttonRed : ""} ${
        className ? className : ""
      }`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
