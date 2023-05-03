import { Container, Header, Form, Button } from "semantic-ui-react";
import React from "react";
import { useState } from "react";
import "firebase/compat/firestore";
import firebase from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import "firebase/compat/storage";

function New_Post() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [topics, setTopics] = useState([]);
  const [topicName, setTopicName] = useState("");
  const [file, setFile] = useState(null);
  const [isloading, setIsloading] = useState(false);

  React.useEffect(() => {
    firebase
      .firestore()
      .collection("topics")
      .get()
      .then((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((doc) => {
          return doc.data();
        });
        // console.log(data);
        setTopics(data);
      });
  }, []);

  const options = topics.map((topic) => {
    return {
      text: topic.name,
      value: topic.name,
    };
  });
  // eslint-disable-next-line
  const preview = file
    ? URL.createObjectURL(file)
    : "https://react.semantic-ui.com/images/wireframe/image.png";

  function onSubmit() {
    setIsloading(true);
    const documentRef = firebase
      .firestore()
      .collection("posts")
      .doc();
    const fileRef = firebase.storage().ref("post/" + documentRef.id);
    // 可能有bug
    let metadata = {};
    if (file !== null) {
      metadata = {
        contentType: file.type,
      };
    }

    fileRef.put(file, metadata).then(() => {
      fileRef.getDownloadURL().then((imageUrl) => {
        documentRef
          .set({
            topic: topicName,
            content,
            title,
            cretedAt: firebase.firestore.Timestamp.now(),
            author: {
              display: firebase.auth().currentUser.displayName || "Unknown",
              photoURL:
                firebase.auth().currentUser.photoURL ||
                "https://react.semantic-ui.com/images/avatar/large/molly.png",
              uid: firebase.auth().currentUser.uid,
              email: firebase.auth().currentUser.email,
            },
            imageUrl,
          })
          .then(() => {
            setIsloading(false);
            navigate("/");
          });
      });
    });
  }

  return (
    <Container>
      <div>
        <Header as="h1">New Post</Header>
      </div>
      <Form onSubmit={onSubmit}>
        {/* <Image src={preview} size="small" floated="left" /> */}
        <Form.Input
          type="file"
          width={6}
          id="post-image"
          style={{ display: "None" }}
          onChange={(e) => {
            setFile(e.target.files[0]);
            console.log(e.target.files[0]);
          }}
        />
        <Form.Input
          placeholder="文章標題"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Form.TextArea
          placeholder="文章內容"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={30}
        />

        <Form.Dropdown
          placeholder="文章分類"
          options={options}
          value={topicName}
          onChange={(e, { value }) => setTopicName(value)}
          selection
        />
        <div>
          <Button as="label" htmlFor="post-image" basic>
            上傳圖片
          </Button>
          <Button loading={isloading}>發布文章</Button>
        </div>

        {/* <div>
          <Form.Button loading={isloading}>Submit</Form.Button>
          <Form.Button basic as="label" htmlFor="post-image">
            上傳檔案
          </Form.Button>
        </div> */}
      </Form>
    </Container>
  );
}

export default New_Post;
