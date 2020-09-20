import React, {useEffect} from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import 'codemirror/addon/display/placeholder'

import {
  addSocket,
  onInputDeletion,
  onInputInsertion,
  getCommands
} from "../../actions";
import { selectors } from "../../reducers";

import { withRouter } from "react-router-dom";
import { getDocumentTag } from '../../utils/locationhandler'

const style = {
  marginLeft: '10vw',
  marginRight: '10vw',
  marginTop: '10vh',
  marginBottom: '10vh',
}

const Editor = withRouter(({
  value,
  options,
  onInputInsertion,
  onInputDeletion,
  addSocket,
  getCommands,
  location,
}) => {
  const pathname = location.pathname
  const documentTag = getDocumentTag(pathname)
  useEffect(() => {
    getCommands(documentTag)
    addSocket(documentTag)
  }, [getCommands, addSocket, documentTag])
  return (
    <Container style={style}>
      <CodeMirror
        value={value}
        options={
          {
            placeholder: 'Share the url and edit this document at the same time!',
            options
          }
        }
        onBeforeChange={(_editor, data, _value) => {
          if (data.origin === "+input") {
            const char = data.text.length === 2 ? "\n" : data.text[0];

            const pos = data.from;

            onInputInsertion(char, pos, documentTag);
          } else if (data.origin === "+delete") {
            const pos = data.to;

            if (pos.line === 0 && pos.ch === 0) {
              return false;
            }

            onInputDeletion(pos, documentTag);
          }
        }}
      />
    </Container>
  );
});

const mapStateToProps = state => {
  return { value: selectors.getText(state.editor) };
};

const mapDispatchToProps = {
  addSocket,
  onInputInsertion,
  onInputDeletion,
  getCommands,
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
