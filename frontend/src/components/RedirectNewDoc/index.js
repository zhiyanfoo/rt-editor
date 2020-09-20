import React, {useEffect} from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import {
  generateNewDoc
} from "../../actions";
import { Redirect } from "react-router-dom";
import { getDocumentUrl } from '../../utils/locationhandler'


const RedirectNewDoc = ({generateNewDoc, documentTag}) => {
  useEffect(() => {
    generateNewDoc()
  }, [generateNewDoc])

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
        {
          documentTag?
          <Redirect to={getDocumentUrl(documentTag)}/>:
          <div>
            Generating document ...
          </div>
        }
      </Col>
    </Row>
  </Container>
};

const mapDispatchToProps = {
  generateNewDoc
};

const mapStateToProps = ({
  editor: {documentTag, ...editorState},
  ...state
}) => {
  console.log('mapStateToProps')
  console.log(state)
  console.log(documentTag)
  return { documentTag };
};

const _RedirectNewDoc = connect(
  mapStateToProps,
  mapDispatchToProps
)(RedirectNewDoc);

export { _RedirectNewDoc as RedirectNewDoc };
