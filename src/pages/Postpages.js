import {
  Container,
  Grid,
  Image,
  Header,
  Segment,
  Button,
  Tab,
} from "semantic-ui-react";
import Topics from "../compoments/Topic";
import firebase from "../utils/firebase";
import React from "react";
import { useParams, Link } from "react-router-dom";
import "firebase/firestore";

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
    { menuItem: 'Tab 1', render: () => <Tab.Pane>Tab 1 Content</Tab.Pane> },
    { menuItem: 'Tab 2', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
    { menuItem: 'Tab 3', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
  ]
  function Deletealert(id) {
    let isExecuted = alert("Are you sure to execute this action?");
    if (isExecuted) {
      onDelete(id);
    } else {
      alert("You have cancelled this action.");
    }
  }
  function onDelete(id) {
    firebase
      .firestore()
      .collection("posts")
      .doc(id)
      .delete()
      .then(() => {
        alert("刪除成功");
      });
  }

  return (
    <Container>
      <Grid>
        <Grid.Row>
          <Grid.Column width={3}>
            <Topics />
          </Grid.Column>
          <Grid.Column width={13}>
            <Tab panes={panes}/>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <Image
                src={post.author.photoURL}
                size="tiny"
                style={{ marginRight: "1rem" }}
              />
              <div>
                <h5>上版本修改人員 :</h5>
                {post.author.displayName || "匿名"}
              </div>
            </div>
            <Segment basic vertical>
              觀看次數: {post.viewCount || 0}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 更改次數:{" "}
              {post.updateCount || 0}
            </Segment>

            <Header as="h1">
              {/* <h1>Title</h1> */}
              {post.title}
              <Header.Subheader>
                {post.created_At
                  ? post.createAt.toDate().toLocaleDateString()
                  : ""}
              </Header.Subheader>
            </Header>
            <Image src={post.imageUrl} size="large" />
            <Segment basic vertical>
              {post.content}
            </Segment>

            <div>
              <Button basic as={Link} to="modify" >
                更改文章
              </Button>
              <Button color="red" onClick={() => Deletealert(post.id)}>
                刪除文章
              </Button>
            </div>
          </Grid.Column>
        </Grid.Row>
        {/* <Headers></Headers> */}
      </Grid>
    </Container>
  );
}

export default Postpages;
