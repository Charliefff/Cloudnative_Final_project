import { Menu, Search, Dropdown } from "semantic-ui-react";
import { Link } from "react-router-dom";
import React from "react";

import firebase from "./utils/firebase";

function Header() {
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const getUsername = () => {
    if (user && user.displayName) {
      return user.displayName;
    }
    return "還沒有名字";
  };

  return (
    <Menu style={{ backgroundColor: "black", color: "white" }}>
      <Menu.Menu position="left">
        {user ? ( // 如果有登入的話
          <Menu.Item as={Link} to="/allpost" style={{ color: "white" }}>
            Document
          </Menu.Item>
        ) : (
          <Menu.Item as={Link} to="/" style={{ color: "white" }}>
            Document
          </Menu.Item>
        )}
      </Menu.Menu>

      <Menu.Item>
        <Search />
      </Menu.Item>
      <Menu.Item
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          color: "white",
        }}
      >
        <h2> TSMC Document</h2>
      </Menu.Item>

      <Menu.Menu position="right">
        {user ? (
          <>
            <Menu.Item as={Link} to="/newPost" style={{ color: "white" }}>
              發表文章
            </Menu.Item>{" "}
            <Menu.Item as={Link} to="/home" style={{ color: "white" }}>
              Main page
            </Menu.Item>{" "}
            <Menu.Item as={Link} to="/view" style={{ color: "white" }}>
              View
            </Menu.Item>
            {/* <Menu.Item
              onClick={() => firebase.auth().signOut()}
              style={{ color: "white" }}
            >
              Logout
            </Menu.Item> */}
            <Dropdown item text={getUsername()} style={{ color: "white" }}>
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => firebase.auth().signOut()}
                  style={{ color: "white" }}
                  as={Link}
                  to="/"
                >
                  Logout
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/home">
                  Main page
                </Dropdown.Item>
                <Dropdown.Item>想到在加</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </>
        ) : (
          <Menu.Item as={Link} to="/" style={{ color: "white" }}>
            Sign in
          </Menu.Item>
        )}
      </Menu.Menu>
    </Menu>
  );
}

export default Header;
