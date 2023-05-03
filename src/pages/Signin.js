import { Menu, Form, Container, Message } from "semantic-ui-react";
import React from "react";
import firebase from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import "firebase/compat/auth";
// import "firebase/compat/app";

function Signin() {
  const Navigate = useNavigate();
  const [activeItem, setActiveItem] = React.useState("Signin");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMessages, setErrorMessages] = React.useState("");
  const [isloading, setIsloading] = React.useState(false);

  function onSubmit() {
    setIsloading(true);
    if (activeItem === "Register") {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          Navigate("/");
          setIsloading(false);
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/email-already-in-use":
              setErrorMessages("Email already in use");
              break;
            case "auth/invalid-email":
              setErrorMessages("Invalid email");
              break;
            case "auth/week-password":
              setErrorMessages("Week password");
              break;
            // case "auth/email-already-in-use":
            //   setErrorMessages("Email already in use");
            //   break;
            default:
          }
          setIsloading(false);
        });
    } else if (activeItem === "Signin") {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          Navigate("/");
          setIsloading(false);
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/invalid-email":
              setErrorMessages("invalid email");
              break;
            case "auth/user-not-found":
              setErrorMessages("User not found");
              break;
            case "auth/wrong-password":
              setErrorMessages("wrong password");
              break;
            // case "auth/email-already-in-use":
            //   setErrorMessages("Email already in use");
            //   break;
            default:
          }
          setIsloading(false);
        });
    }
  }

  return (
    <>
      <Container>
        <Menu widths={2}>
          <Menu.Item
            active={activeItem === "Signin"}
            onClick={() => {
              setErrorMessages("");
              setActiveItem("Signin");
            }}
          >
            Sign in
          </Menu.Item>
          <Menu.Item
            active={activeItem === "Register"}
            onClick={() => {
              setErrorMessages("");
              setActiveItem("Register");
            }}
          >
            Register
          </Menu.Item>
        </Menu>
        <Form onSubmit={onSubmit}>
          <Form.Input
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Username"
            type="email"
          />
          <Form.Input
            label="Password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          {errorMessages && <Message negative>{errorMessages}</Message>}
          <Form.Button loading={isloading}>
            {activeItem === "Signin" ? "Sign in" : "Register"}
          </Form.Button>
        </Form>
      </Container>
    </>
  );
}

export default Signin;
