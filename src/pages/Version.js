import { Image, Header, Segment, Button } from "semantic-ui-react";
// import firebase from "../utils/firebase";
import React from "react";
import { useParams, Link } from "react-router-dom";
// import "firebase/firestore";
import { version } from "react/cjs/react.production.min";

function Version({ versionId }) {
  const { postId } = useParams();
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
  //         setPost({
  //           title: data.title,
  //           content: data.content,
  //           imageUrl: data.imageUrl,
  //           author: data.author,
  //           viewCount: data.viewCount || 0,
  //           updateCount: data.updateCount || 0,
  //           cretedAt: data.cretedAt || new Date(), // 使用默認值
  //         });
  //       });
  //   } else {
  //     firebase
  //       .firestore()
  //       .collection("posts")
  //       .doc(postId)
  //       .get()
  //       .then((docSnapshot) => {
  //         const data = docSnapshot.data();
  //         setPost({
  //           title: data.title,
  //           content: data.content,
  //           imageUrl: data.imageUrl,
  //           author: data.author,
  //           viewCount: data.viewCount || 0,
  //           updateCount: data.updateCount || 0,
  //           cretedAt: data.cretedAt || new Date(), // 使用默認值
  //         });
  //       });
  //   }
  // }, [postId]);


  React.useEffect(() => {
  // if有versionId，就去拿不同版本資料
  // else就去拿原始資料
  }, [postId]);


  // function onDelete(id) {
  //   firebase
  //     .firestore()
  //     .collection("posts")
  //     .doc(id)
  //     .delete()
  //     .then(() => {
  //       alert("刪除成功");
  //     });
  // }

  function onDelete(id) {
    // 根據id來刪除文章
  }

  return (
    <>
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
          <h5>版本修改人員 / 時間 :</h5>
          {post.author.displayName || "匿名 / "}
          {"    "}
          {post.cretedAt
            ? post.cretedAt.toDate().toLocaleString([], {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
            : "2021-10-10 08:00 AM"}
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
      </Header>
      <Image src={post.imageUrl} size="large" />
      <Segment basic vertical>
        {post.content}
      </Segment>

      <div>
        <Button
          basic
          as={Link}
          to={versionId ? `modify/${versionId}` : `modify`}
        >
          更改文章
        </Button>
        <Button color="red" onClick={() => onDelete(post.id)}>
          刪除文章
        </Button>
      </div>
    </>
  );
}

export default Version;