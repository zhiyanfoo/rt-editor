import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";

import { generateNewDoc } from "../../actions";

const GenerateNewDoc = ({ generateNewDoc }) => (
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
        <Button variant="primary" onClick={generateNewDoc}>
          Create New Document
        </Button>
      </Col>
    </Row>
  </Container>
);

const mapDispatchToProps = {
  generateNewDoc
};

const mapStateToProps = state => {
  return {};
};

const GenerateNewDoc_ = connect(
  mapStateToProps,
  mapDispatchToProps
)(GenerateNewDoc);

export { GenerateNewDoc_ as GenerateNewDoc };
