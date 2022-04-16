import React from "react";
import styles from "./List.module.css";

type ListProps = {
  children: React.ReactNode;
};

const List = ({ children }: ListProps) => {
  return <ul className={styles.list}>{children}</ul>;
};

export default List;
