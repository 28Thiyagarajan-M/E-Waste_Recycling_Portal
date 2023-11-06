import React from "react";
import { Link } from "react-router-dom";

import { Card, Button } from "react-bootstrap";
const CustomCard = ({ title, text, to }) => {
  return (
    <Card style={{ width: "18rem" }} bg="dark" text="light">
      <Card.Body>
        <Card.Title className="heading">{title}</Card.Title>
        <hr />
        <Card.Text className="bodyText">{text}</Card.Text>
        <Link to={to}>
          <Button variant="primary">Register Here</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default CustomCard;
