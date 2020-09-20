import React, {useEffect} from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/monokai.css";
import { connect } from "react-redux";

import {
  addSocket,
  onInputDeletion,
  onInputInsertion,
  getCommands
} from "../../actions";
import { selectors } from "../../reducers";

import { withRouter } from "react-router-dom";
import { getDocumentTag } from '../../utils/locationhandler'

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
    <CodeMirror
      value={value}
      options={{lineNumbers: true, options}}
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
