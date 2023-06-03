import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, Grid } from 'semantic-ui-react';
import Topics from '../layout/Topic';
import { Link } from 'react-router-dom';

const DeleteHistory = () => {
  const [histories, setHistories] = useState([]);

  useEffect(() => {
    const getDeleteHistory = async () => {
      try {
        const res = await axios.get('/api/deletedHistories');
        setHistories(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    getDeleteHistory();
  }, []);

  return (
    <Container>
      <Grid>
        <Grid.Column width={3}>
          <Topics />
        </Grid.Column>
        <Grid.Column width={13}>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>User Name</Table.HeaderCell>
                <Table.HeaderCell>Title</Table.HeaderCell>
                <Table.HeaderCell>Date</Table.HeaderCell>
                <Table.HeaderCell>Operation</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {histories.map(history => (
                <Table.Row key={history._id}>
                  <Table.Cell>{history.userName}</Table.Cell>
                  <Table.Cell>
                    <Link to={`/history/${history._id}`}>{history.title}</Link>
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
  );
};

export default DeleteHistory;
