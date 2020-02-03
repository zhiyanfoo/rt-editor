import React from "react";
import {
  Switch,
  Route,
} from "react-router-dom";
import { ConnectedRouter } from 'connected-react-router'

import { history } from './navigation'

import { GenerateNewDoc } from "./components/GenerateNewDoc";
import Editor from "./components/Editor";

const App = () => {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/">
          <Editor />
        </Route>
        <Route exact path="/new-doc">
          <GenerateNewDoc />
        </Route>
        <Route
          exact
          path="/document/:documentTag"
          render={({ match }) => {
            return <Editor document_tag={match.params.documentTag}/>;
          }}
        />
      </Switch>
    </ConnectedRouter>
  );
};

export default App;
