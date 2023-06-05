import { Menu, Dropdown, Image } from "semantic-ui-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth, logout } from "../../context/auth/AuthState";
import "./layout.css";

const Navbar = ({ title, icon }) => {
  const [authState, authDispatch] = useAuth();
  const { isAuthenticated, user } = authState;

  const onLogout = () => {
    logout(authDispatch);
  };

  const [activeItem, setActiveItem] = useState("share");
  const handleItemClick = (e, { name }) => setActiveItem(name);

  return (
    <Menu style={{ backgroundColor: "black", color: "white" }}>
      <Menu.Menu position="left">
        <Menu.Item as={Link} to="/">
          <img
            src={require("./tsmc.jpg")}
            style={{ width: "45px", height: "35px", marginLeft: "auto" }}
          />
        </Menu.Item>
        <Menu.Item
          as={Link}
          to="/"
          style={{
            color: "white",
            marginLeft: "1px",
          }}
          name="share"
          active={activeItem === "share"}
          onClick={handleItemClick}
        >
          <h2> TSMC Document</h2>
        </Menu.Item>
      </Menu.Menu>

      <Menu.Menu position="right">
        {isAuthenticated ? (
          <>
            <Menu.Item
              as={Link}
              to="/new"
              name="new"
              active={activeItem === "new"}
              onClick={handleItemClick}
              style={{
                color: "white",
                backgroundColor:
                  activeItem === "new" ? "rgba(50, 50, 50, 0.9)" : "black",
              }}
            >
              發表文章
            </Menu.Item>{" "}
            <Menu.Item
              as={Link}
              to="/deleteHistory"
              name="History"
              active={activeItem === "History"}
              onClick={handleItemClick}
              style={{
                color: "white",
                backgroundColor:
                  activeItem === "History" ? "rgba(50, 50, 50, 0.9)" : "black",
              }}
            >
              歷史紀錄
            </Menu.Item>{" "}
            <Menu.Item
              as={Link}
              to="/userProfile"
              name="userProfile"
              active={activeItem === "userProfile"}
              onClick={handleItemClick}
              style={{
                color: "white",
                backgroundColor:
                  activeItem === "userProfile"
                    ? "rgba(50, 50, 50, 0.9)"
                    : "black",
              }}
            >
              使用者檔案
            </Menu.Item>{" "}
            <Dropdown
              item
              text={user && user.name}
              style={{ color: "white" }}
              active={activeItem === "Dropdown"}
              onClick={handleItemClick}
            >
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={onLogout}
                  // style={{ color: "white" }}
                  as={Link}
                  to="/login"
                >
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </>
        ) : (
          <>
            <Menu.Item as={Link} to="/login" style={{ color: "white" }}>
              Sign in
            </Menu.Item>{" "}
            <Menu.Item as={Link} to="/register" style={{ color: "white" }}>
              Register
            </Menu.Item>
          </>
        )}
      </Menu.Menu>
    </Menu>
  );
};

export default Navbar;
