import React from "react";
import styles from "./Button.module.css";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "submit" | "button";
};

const Button = ({ children, onClick, type }: ButtonProps) => {
  return (
    <button className={styles.btn} type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;