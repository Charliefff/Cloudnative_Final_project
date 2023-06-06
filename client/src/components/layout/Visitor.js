import React, { useState } from "react";
import { List, Icon } from "semantic-ui-react";
import { Link, useLocation } from "react-router-dom";
import "./layout.css";

const Visitor = () => {
  const [activeItem, setActiveItem] = useState(null);
  const location = useLocation();

  const handleItemClick = (index) => {
    setActiveItem(index);
  };

  return (
    <List animated selection className="topic-list" size="large">
      <List.Item
        as={Link}
        to={"/"}
        className={location.pathname === "/" ? "active" : ""}
        onClick={() => handleItemClick(0)}
      >
        共享文件
      </List.Item>
    </List>
  );
};

export default Visitor;
