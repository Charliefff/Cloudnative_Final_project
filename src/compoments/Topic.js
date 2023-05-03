import React from "react";
import firebase from "../utils/firebase";
import "firebase/compat/firestore";
import { List } from "semantic-ui-react";
import { Link, useLocation } from "react-router-dom";
function Topics() {
  const location = useLocation();
  const pathname = location.pathname; // "/topic/%E8%96%AA%E6%B0%B4"
  const parts = pathname.split('/'); // [ "", "topic", "%E8%96%AA%E6%B0%B4" ]
  const currentTopic = decodeURIComponent(parts[1]); // "薪水"  
  const [topics, setTopics] = React.useState([]);
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
  }, [currentTopic]);

  return (
    <List animated selection>
      {topics.map((topic) => {
        return <List.Item key={topic.name} as={Link} to={`/${topic.name}`} active={currentTopic === topic.name}>{topic.name}</List.Item>;
      })}
    </List>
  );
}

export default Topics;
