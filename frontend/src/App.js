import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
  // Link
} from "react-router-dom";

import { GenerateNewDoc } from "./components/GenerateNewDoc";
import Editor from "./components/Editor";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Editor />
        </Route>
        <Route exact path="/new-doc">
          <GenerateNewDoc />
        </Route>
        <Route
          exact
          path="/document/:id"
          render={({ match }) => {
            return <GenerateNewDoc />;
          }}
        />
      </Switch>
    </Router>
  );
};

export default App;
