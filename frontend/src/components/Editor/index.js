import React from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/monokai.css";
import { connect } from "react-redux";

import { structToText } from "../../util";
import { onInputDeletion, onInputInsertion } from "../../actions";

const Editor = ({ value, options, onInputInsertion, onInputDeletion }) => {
  return (
    <CodeMirror
      value={value}
      options={options}
      onBeforeChange={(_editor, data, _value) => {
        if (data.origin === "+input") {
          const char = data.text.length === 2 ? "\n" : data.text[0];

          const pos = data.from;

          onInputInsertion(char, pos);
        } else if (data.origin === "+delete") {
          const pos = data.to;

          if (pos.line === 0 && pos.ch === 0) {
            return false;
          }

          onInputDeletion(pos);
        }
      }}
    />
  );
};

const mapStateToProps = state => {
  return { value: structToText(state.struct) };
};

const mapDispatchToProps = {
  onInputInsertion,
  onInputDeletion
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
