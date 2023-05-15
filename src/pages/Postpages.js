import { Container, Grid, Item, MenuItem, Tab } from "semantic-ui-react";
import Topics from "../compoments/Topic";
import firebase from "../utils/firebase";
import React from "react";
import { useParams } from "react-router-dom";
import "firebase/firestore";
import Version from "./Version";

function Postpages() {
  const { postId } = useParams();

  const [originalPost, setOriginalPost] = React.useState({
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
        setOriginalPost({
          cretedAt: data.cretedAt || new Date(), // 使用默認值
        });
      });
  }, [postId]);

  const [posts, setPosts] = React.useState([]);
  React.useEffect(() => {
    firebase
      .firestore()
      .collection("posts")
      .doc(postId)
      .collection("versions")
      .get()
      .then((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((docSnapshot) => {
          const id = docSnapshot.id;
          return { ...docSnapshot.data(), id };
        });
        setPosts(data);
      });
  }, []);

  const panes = [
    {
      menuItem: "INITIAL VERSION",
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
            <Tab.Pane>
              <Item.Group>
                {posts.map((post) => {
                  return (
                    <Item key={post.id}>
                      <Tab panes={panes} />
                    </Item>
                  );
                })}
              </Item.Group>
            </Tab.Pane>
          </Grid.Column>
        </Grid.Row>
        {/* <Headers></Headers> */}
      </Grid>
    </Container>
  );
}

export default Postpages;
