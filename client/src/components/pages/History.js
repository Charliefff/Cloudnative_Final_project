import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Segment, Divider, Icon, Button } from 'semantic-ui-react';
import Spinner from '../layout/Spinner';
import axios from 'axios';

const History = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [history, setHistory] = useState(null);

  useEffect(() => {
    const gethistory = async () => {
      try {
        const res = await axios.get(`/api/histories/page/${id}`);
        setHistory(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    gethistory();
  }, [id]);

  if (!history) {
    return <Spinner />;
  }

  return (
    <div>
      <Button icon labelPosition='right' onClick={() => navigate(-1)}>
        <Icon name='arrow left' />
        Back
      </Button>
      <Segment>
        <h2>{history.title}</h2>
        <p>
          <strong>{history.userName}</strong> • {history.date}
        </p>
        <Divider />
        <p>{history.content}</p>
      </Segment>
    </div>
  );
};

export default History;
