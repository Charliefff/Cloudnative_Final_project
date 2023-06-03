import React, { useState, useEffect } from 'react';
import { Container, Grid, Item, Icon } from 'semantic-ui-react';
import Topics from '../layout/Topic';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import axios from 'axios';
import { useAuth } from '../../context/auth/AuthState';

const Shared = () => {
  // const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);
  const [state] = useAuth();
  const isAuthenticated = state.isAuthenticated;

  // const onClick = documentId => {
  //   navigate(`/document/${documentId}`);
  // };

  useEffect(() => {
    axios
      .get('/api/shared')
      .then(res => {
        setDocuments(res.data);
      })
      .catch(error => {
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
          <Grid.Column width={5}>
            {isAuthenticated ? <Topics /> : null}
          </Grid.Column>
          <Grid.Column width={8}>
            <Item.Group>
              {documents.map(document => {
                return (
                  <Item
                    key={document._id}
                    as={Link}
                    to={`/document/${document._id}`}
                  >
                    <Item.Content>
                      <Item.Meta>
                        <Icon name='user circle' size='small' />
                        {document.department} • {document.userName || '匿名'} •{' '}
                        {new Date(document.date).toLocaleString([], {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </Item.Meta>

                      <Item.Header>{document.title}</Item.Header>
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
    //   <h1>Shared Documents</h1>
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

export default Shared;
