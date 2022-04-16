import React from "react";

type ListItemProps = {
  children: React.ReactNode;
};

const ListItem = ({ children }: ListItemProps) => {
  return <li>{children}</li>;
};

export default ListItem;
