import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/auth/AuthState';
import { Container, Table, Grid } from 'semantic-ui-react';
import axios from 'axios';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';

const UserProfile = () => {
  const [state] = useAuth();
  const { user } = state;
  const name = user && user.name;
  const department = user && user.department;
  const [histories, setHistories] = useState([]);

  useEffect(() => {
    const getUserHistory = async () => {
      try {
        const res = await axios.get('/api/histories');
        setHistories(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    getUserHistory();
  }, []);

  if (!histories) {
    return <Spinner />;
  }

  return (
    <div>
      <Container>
        <Grid>
          <Grid.Column width={3}>
            <h1>User Profile</h1>
            <p>{name}</p>
            <p>{department}</p>
          </Grid.Column>
          <Grid.Column width={13}>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Title</Table.HeaderCell>
                  <Table.HeaderCell>Date</Table.HeaderCell>
                  <Table.HeaderCell>Operation</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {histories.map(history => (
                  <Table.Row key={history._id}>
                    <Table.Cell>
                      <Link to={`/history/${history._id}`}>
                        {history.title}
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      {new Date(history.date).toLocaleString()}
                    </Table.Cell>
                    <Table.Cell>{history.operation}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
};

export default UserProfile;
