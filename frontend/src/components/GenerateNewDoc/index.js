import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

// import { generateNewDoc } from "../../actions";
const GenerateNewDoc = withRouter(({ generateNewDoc, history }) => {
  // const generateNewDocClosure = () => {
  //   generateNewDoc(history)
  // }
  return <Container
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
        <Link className="btn btn-default" to='/new'>
          Create New Document
        </Link>
      </Col>
    </Row>
  </Container>
});

const mapDispatchToProps = {
  // generateNewDoc
};

const mapStateToProps = state => {
  return {};
};

const GenerateNewDoc_ = connect(
  mapStateToProps,
  mapDispatchToProps
)(GenerateNewDoc);

export { GenerateNewDoc_ as GenerateNewDoc };
