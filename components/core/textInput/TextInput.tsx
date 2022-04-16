import React from "react";
import styles from "./TextInput.module.css";

type TextInputProps = {
  value: string;
  onChange: React.ChangeEventHandler;
  maxLength?: number;
  placeHolder?: string;
};

const TextInput = ({
  value,
  onChange,
  maxLength,
  placeHolder,
}: TextInputProps) => {
  return (
    <input
      className={styles.textInput}
      type="text"
      value={value}
      onChange={onChange}
      maxLength={maxLength}
      placeholder={placeHolder}
    />
  );
};

export default TextInput;
