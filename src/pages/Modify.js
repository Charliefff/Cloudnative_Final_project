import { Button, Container, Form, Header } from "semantic-ui-react";
import { useState } from "react";

import firebase from "../utils/firebase";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "firebase/firestore";

function Modify() {
  const { postId, versionId } = useParams();
  const navigate = useNavigate();
  // eslint-disable-next-line
  const [content, setContent] = useState("");
  const [isloading, setIsloading] = useState(false);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [topicName, setTopicName] = useState("");

  const [post, setPost] = React.useState({
    author: {},
  });
  // React.useEffect(() => {
  //   if (versionId) {
  //     firebase
  //       .firestore()
  //       .collection("posts")
  //       .doc(postId)
  //       .collection("versions")
  //       .doc(versionId)
  //       .get()
  //       .then((docSnapshot) => {
  //         const data = docSnapshot.data();
  //         setPost(data);
  //       });
  //   } else {
  //     firebase
  //       .firestore()
  //       .collection("posts")
  //       .doc(postId)
  //       .get()
  //       .then((docSnapshot) => {
  //         const data = docSnapshot.data();
  //         setPost(data);
  //       });
  //   }
  // }, [postId, versionId]);

  React.useEffect(() => {
  // if有versionId，就去抓不同版本資料
  // else就去抓原始資料
  }, [postId, versionId]);


  // 根據跟改資料的不同，去改變不同的state
  React.useEffect(() => {
    setContent(post.content);
  }, [post.content]);

  React.useEffect(() => {
    setTitle(post.title);
  }, [post.title]);

  React.useEffect(() => {
    setTopicName(post.topic);
  }, [post.topic]);



  // function onSubmit() {
  //   setIsloading(true);

  //   const documentRef = firebase
  //     .firestore()
  //     .collection("posts")
  //     .doc(postId)
  //     .collection("versions")
  //     .doc();

  //   const fileRef = firebase
  //     .storage()
  //     .ref("post/" + postId + "versions/" + documentRef.id);

  //   let metadata = {};
  //   if (file !== null) {
  //     metadata = {
  //       contentType: file.type,
  //     };
  //   }

  //   fileRef.put(file, metadata).then(() => {
  //     fileRef.getDownloadURL().then((imageUrl) => {
  //       documentRef
  //         .set({
  //           topic: topicName,
  //           content,
  //           title,
  //           cretedAt: firebase.firestore.Timestamp.now(),
  //           author: {
  //             display: firebase.auth().currentUser.displayName || "Unknown",
  //             photoURL:
  //               firebase.auth().currentUser.photoURL ||
  //               "https://react.semantic-ui.com/images/avatar/large/molly.png",
  //             uid: firebase.auth().currentUser.uid,
  //             email: firebase.auth().currentUser.email,
  //           },
  //           imageUrl,
  //         })
  //         .then(() => {
  //           setIsloading(false);
  //           navigate("/");
  //         });
  //     });
  //   });
  // }

  function onSubmit() {

    // 提交表單時，先把loading設為true 根據postid跟versionid去判斷要更新哪個資料
  }

  return (
    <Container>
      <Header as="h1">更改文章</Header>
      <Form onSubmit={onSubmit}>
        <Form.Input value={post.title} readOnly />
        <Form.TextArea
          // placeholder={post.content}

          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={30}
        />
        <Button loading={isloading}>送出更改</Button>
      </Form>
    </Container>
  );
}

export default Modify;
