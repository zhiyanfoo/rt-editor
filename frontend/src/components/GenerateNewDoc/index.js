import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";

export const GenerateNewDoc = () => (
  <Container
    className="text-center"
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      width: "100vw"
    }}
  >
    <Row>
      <Col>
        <Button variant="primary">Create New Document</Button>
      </Col>
    </Row>
  </Container>
);
