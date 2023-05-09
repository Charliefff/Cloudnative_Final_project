import { Container, Grid, Tab } from "semantic-ui-react";
import Topics from "../compoments/Topic";
import firebase from "../utils/firebase";
import React from "react";
import { useParams } from "react-router-dom";
import "firebase/firestore";
import Version from "./Version";

function Postpages() {
  const { postId } = useParams();
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
        setPost({
          title: data.title,
          content: data.content,
          imageUrl: data.imageUrl,
          author: data.author,
          viewCount: data.viewCount || 0,
          updateCount: data.updateCount || 0,
          createAt: data.createAt || new Date(), // 使用默認值
        });
      });
  }, [postId]);
  const panes = [
    {
      menuItem: "Tab 1",
      render: () => (
        <Tab.Pane>
          <Version />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Tab 2",
      render: () => (
        <Tab.Pane>
          <Version />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Tab 3",
      render: () => (
        <Tab.Pane>
          <Version />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <Container>
      <Grid>
        <Grid.Row>
          <Grid.Column width={3}>
            <Topics />
          </Grid.Column>
          <Grid.Column width={13}>
            <Tab panes={panes} />
          </Grid.Column>
        </Grid.Row>
        {/* <Headers></Headers> */}
      </Grid>
    </Container>
  );
}

export default Postpages;
