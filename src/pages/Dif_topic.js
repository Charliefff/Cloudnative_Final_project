import { Container, Grid, Item, Image, Icon } from "semantic-ui-react";
import React from "react";
import Topics from "../compoments/Topic";
import firebase from "../utils/firebase";
import { Link, useLocation } from "react-router-dom";

function Dif_topic() {
  const location = useLocation();
  const pathname = location.pathname;
  const parts = pathname.split("/");
  const currentTopic = decodeURIComponent(parts[1]);
  const [posts, setPosts] = React.useState([]);
  React.useEffect(() => {
    firebase
      .firestore()
      .collection("posts")
      .where("topic", "==", currentTopic)
      .get()
      .then((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((docSnapshot) => {
          const id = docSnapshot.id;
          return { ...docSnapshot.data(), id };
        });
        setPosts(data);
      });
  }, [currentTopic]);
  // eslint-disable-next-line
  // function updateViewUser(postId) {
  //   firebase
  //     .firestore()
  //     .collection("posts")
  //     .doc(postId)
  //     .update({
  //       viewUser: firebase.firestore.FieldValue.arrayUnion(
  //         firebase.auth().currentUser.uid
  //       ),
  //     });
  // }
  function incrementViewCount(postId) {
    firebase
      .firestore()
      .collection("posts")
      .doc(postId)

      .update({
        viewCount: firebase.firestore.FieldValue.increment(1),
      });
  }

  return (
    <Container>
      <Grid>
        <Grid.Row>
          <Grid.Column width={3}>
            <Topics />
          </Grid.Column>
          <Grid.Column width={9}>
            <Item.Group>
              {posts.map((post) => {
                return (
                  <Item
                    key={post.id}
                    as={Link}
                    to={`/post/${post.id}`}
                    onClick={() => incrementViewCount(post.id)}
                  >
                    <Image src={post.imageUrl} size="tiny" />

                    <Item.Content>
                      <Item.Meta>
                        {post.author.photoURL ? (
                          <Image src={post.author.photoURL} width={25} />
                        ) : (
                          <Icon name="user circle" size="small" />
                        )}
                        {post.topic} • {post.author.name || "匿名"} •{" "}
                        {post.cretedAt
                          ? post.cretedAt.toDate().toLocaleString([], {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "2021-10-10 08:00 AM"}
                      </Item.Meta>

                      <Item.Header>{post.title}</Item.Header>
                      <Item.Description>{post.content}</Item.Description>
                      <Item.Extra>
                        {/* <a href={`/posts/${post.id}/edit`}> */}
                        修改次數 : {post.updateCount || 0}
                        {/* </a>{" "} */}•{" "}
                        {/* <a href={`/posts/${post.id}`}> */}
                        觀看次數 : {post.viewCount || 0}
                        {/* </a> */}
                      </Item.Extra>
                    </Item.Content>
                  </Item>
                );
              })}
            </Item.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}

export default Dif_topic;
