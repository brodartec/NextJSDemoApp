import React from "react";
import styles from "./AppContainer.module.css";

type AppContainerProps = {
  children: React.ReactNode;
};

const AppContainer = ({ children }: AppContainerProps) => {
  return <div className={styles.appContainer}>{children}</div>;
};

export default AppContainer;