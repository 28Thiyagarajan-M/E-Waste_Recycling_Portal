import React from "react";
import notFoundImage from "../images/notFoundImage.avif";
import { Image, Card } from "react-bootstrap";
import Helmet from "../components/Helmet";

export default function NotFoundPage() {
  return (
    <Helmet title="Not Found">
      <div className="p-2 vh-75">
        <Card>
          <Card.Body className="text-center">
            <Image src={notFoundImage} />
          </Card.Body>
        </Card>
      </div>
    </Helmet>
  );
}
