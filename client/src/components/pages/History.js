import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Segment, Divider, Icon, Button } from "semantic-ui-react";
import Spinner from "../layout/Spinner";
import axios from "axios";
<<<<<<< HEAD
import "./history.css";
=======
import "./History.css";
>>>>>>> 2e74f553556a112dd02eff6417aa0a62f4475a35

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
      <Segment className="segment">
        <h2>{history.title}</h2>
        <p>
          <strong>{history.userName}</strong> • {history.date}
        </p>
        <Divider />
        <p>{history.content}</p>
      </Segment>
      <Button
        icon
        labelPosition="right"
        onClick={() => navigate(-1)}
        className="button"
      >
        <Icon name="arrow left" />
        Back
      </Button>
    </div>
  );
};

export default History;
