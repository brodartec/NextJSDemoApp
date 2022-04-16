import React from "react";
import styles from "./ContentContainer.module.css";

type ContentContainerProps = {
  children: React.ReactNode;
};

const ContentContainer = ({ children }: ContentContainerProps) => {
  return <main className={styles.contentContainer}>{children}</main>;
};

export default ContentContainer;
