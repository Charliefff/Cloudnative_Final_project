import { Button, Container, Form, Header} from "semantic-ui-react";
import { useState } from "react";

import firebase from "../utils/firebase";
import React from "react";
import { useParams} from "react-router-dom";
import "firebase/firestore";

function Modify() {
  const { postId } = useParams();
  // eslint-disable-next-line
  const [content, setContent] = useState("");
  // const [title, setTitle] = useState("");

  const [post, setPost] = React.useState({
    author: {},
  }); //[post, setPost] = React.useState({}); // 這裡的post是一個物件，所以要用{}，不是[]
  React.useEffect(() => {
    firebase
      .firestore()
      .collection("posts")
      .doc(postId)
      .get()
      .then((docSnapshot) => {
        const data = docSnapshot.data();
        setPost(data);
      });
  }, [postId]);

  return (
    <Container>
      <Header as="h1">更改文章</Header>
      <Form>
        <Form.Input value={post.title} readOnly />
        <Form.TextArea
          // placeholder={post.content}
          value={post.content}
          onChange={(e) => setContent(e.target.value)}
          rows={30}
        />
        {/* <Image src={post.imageUrl} size="small" floated="left" /> */}
        <Button>送出更改</Button>
      </Form>
    </Container>
  );
}

export default Modify;
