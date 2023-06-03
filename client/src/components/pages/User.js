import React, { useState, useEffect } from "react";
import { Container, Grid, Item, Icon, Card } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Topics from "../layout/Topic";
import Spinner from "../layout/Spinner";
import axios from "axios";

const User = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    axios
      .get("/api/documents")
      .then((res) => {
        setDocuments(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
    // eslint-disable-next-line
  }, []);

  if (!documents) {
    return <Spinner />;
  }
  return (
    <Container>
      <Grid>
        <Grid.Row>
          <Grid.Column width={3}>
            <Topics />
          </Grid.Column>
          <Grid.Column width={13}>
            <Item.Group>
              {documents.map((document) => {
                return (
                  <Item
                    key={document._id}
                    as={Link}
                    to={`/document/${document._id}`}
                  >
                    {/* <Image src={post.imageUrl} size='tiny' /> */}

                    <Item.Content>
                      <Card
                        style={{
                          width: "650px",
                          height: "120px",
                          border: "1px solid #D3D3D3",
                          // borderBottom: "1px solid #000",
                        }}
                      >
                        <Card.Content>
                          <Card.Header
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <div>
                              <h1>{document.title}</h1>{" "}
                            </div>
                            <div>
                              <h6>
                                {new Date(document.date).toLocaleString([], {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </h6>
                            </div>
                          </Card.Header>
                          <Card.Meta>
                            <h5 style={{ color: "#919191" }}>
                              <Icon name="user circle" size="small" />
                              {document.userName || "匿名"} •
                              {document.department}
                            </h5>
                          </Card.Meta>

                          <Card.Meta style={{ color: "#000000" }}>
                            {" "}
                            {document.content.length > 80
                              ? `${document.content.substring(0, 80)}...`
                              : document.content}
                          </Card.Meta>
                        </Card.Content>
                      </Card>
                    </Item.Content>
                  </Item>
                );
              })}
            </Item.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>

    // <div>
    //   <h1>User Documents</h1>
    //   <ul>
    //     {documents.map(document => (
    //       <li key={document._id}>
    //         <h2>{document.title}</h2>
    //         <p>{new Date(document.date).toLocaleDateString()}</p>
    //         <p>{document.userName}</p>
    //         <button onClick={() => onClick(document._id)}>view</button>
    //       </li>
    //     ))}
    //   </ul>
    // </div>
  );
};

export default User;
