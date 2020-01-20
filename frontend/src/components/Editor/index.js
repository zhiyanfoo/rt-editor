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

// import Codemirror from 'react-codemirror2';
// import 'codemirror/lib/codemirror.css';
// import 'codemirror/theme/monokai.css';

// var ReactDOM = require('react-dom');
// const createReactClass = require('create-react-class');

// require('codemirror/mode/javascript/javascript');
// require('codemirror/mode/xml/xml');
// require('codemirror/mode/markdown/markdown');

// var defaults = {
// 	markdown: '# Heading\n\nSome **bold** and _italic_ text\nBy [Jed Watson](https://github.com/JedWatson)',
// 	javascript: 'var component = {\n\tname: "react-codemirror",\n\tauthor: "Jed Watson",\n\trepo: "https://github.com/JedWatson/react-codemirror"\n};'
// };

// var App = createReactClass({
// 	getInitialState () {
// 		return {
// 			code: defaults.markdown,
// 			readOnly: false,
// 			mode: 'markdown',
// 		};
// 	},
// 	updateCode (newCode, change) {
//     console.log(change)
// 		this.setState({
// 			code: newCode + 'a'
// 		});
// 	},
// 	changeMode (e) {
// 		var mode = e.target.value;
// 		this.setState({
// 			mode: mode,
// 			code: defaults[mode]
// 		});
// 	},
// 	toggleReadOnly () {
// 		this.setState({
// 			readOnly: !this.state.readOnly
// 		}, () => this.refs.editor.focus());
// 	},
// 	render () {
// 		var options = {
// 			lineNumbers: true,
// 			readOnly: this.state.readOnly,
// 			mode: this.state.mode
// 		};
// 		return (
// 			<div>
// 				<Codemirror ref="editor" value={this.state.code} onChange={this.updateCode} options={options} autoFocus={true} />
// 				<div style={{ marginTop: 10 }}>
// 					<select onChange={this.changeMode} value={this.state.mode}>
// 						<option value="markdown">Markdown</option>
// 						<option value="javascript">JavaScript</option>
// 					</select>
// 					<button onClick={this.toggleReadOnly}>Toggle read-only mode (currently {this.state.readOnly ? 'on' : 'off'})</button>
// 				</div>
// 			</div>
// 		);
// 	}
// });

// export default App;
