import React, { useEffect, useState } from 'react';
import {
  Header,
  Segment,
  Button,
  Container,
  Grid,
  Item,
  ItemGroup,
  ItemContent,
  ItemMeta,
  ItemHeader,
} from 'semantic-ui-react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/auth/AuthState';
import Spinner from '../layout/Spinner';
import Topics from '../layout/Topic';

const DocumentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [document, setDocument] = useState(null);
  const [histories, setHistories] = useState([]);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await axios.get(`/api/documents/${id}`);
        setDocument(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchHistories = async () => {
      try {
        const response = await axios.get(`/api/histories/${id}`);
        setHistories(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDocument();
    fetchHistories();
  }, [id]);

  // Get user
  const [state] = useAuth();
  const { user } = state;
  const userID = user && user._id;
  const userDepartment = user && user.department;
  const isAuthenticated = state.isAuthenticated;

  if (!document) {
    return <Spinner />;
  }

  const handleEdit = () => {
    navigate(`/document/${id}/edit`);
  };

  const handleDelete = () => {
    axios
      .delete(`/api/documents/${id}`)
      .then(() => {
        // Add history record
        axios.post('/api/histories', {
          documentId: id,
          title: document.title,
          content: document.content,
          operation: 'Delete',
        });

        navigate('/', { replace: true });
      })
      .catch(error => {
        console.error(error);
      });
  };

  const isOwner = () => {
    if (user && document.user === userID) {
      return true;
    }
    return false;
  };

  const isDepartment = () => {
    if (user && document.department === userDepartment) {
      return true;
    }
    return false;
  };

  return (
    <Container>
      <Grid>
        <Grid.Row>
          <Grid.Column width={5}>
            {isAuthenticated ? <Topics /> : null}
            <ItemGroup>
              <Header as='h3'>歷史紀錄</Header>
              {histories.map(history => {
                return (
                  <Item
                    key={history._id}
                    as={Link}
                    to={`/history/${history._id}`}
                  >
                    <ItemContent>
                      <ItemHeader>{history.userName}</ItemHeader>
                      <ItemMeta>Operation: {history.operation}</ItemMeta>
                      <ItemMeta>
                        {new Date(history.date).toLocaleString([], {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </ItemMeta>
                    </ItemContent>
                  </Item>
                );
              })}
            </ItemGroup>
          </Grid.Column>
          <Grid.Column width={8}>
            <>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '1rem',
                }}
              >
                <div>
                  <h5>使用者 / 時間 :</h5>
                  {document.userName || '匿名 / '}
                  {'  /  '}
                  {new Date(document.date).toLocaleString([], {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
              <Header as='h1'>{document.title}</Header>
              <Segment basic vertical>
                {document.content}
              </Segment>
              <div>
                {isAuthenticated && isOwner() ? (
                  <>
                    <Button basic onClick={handleEdit}>
                      更改文章
                    </Button>
                    <Button color='red' onClick={handleDelete}>
                      刪除文章
                    </Button>
                  </>
                ) : isAuthenticated && isDepartment() ? (
                  <Button basic onClick={handleEdit}>
                    更改文章
                  </Button>
                ) : null}
              </div>
            </>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default DocumentDetail;
