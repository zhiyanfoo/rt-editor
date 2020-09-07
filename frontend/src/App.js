import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { GenerateNewDoc } from "./components/GenerateNewDoc";
import Editor from "./components/Editor";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <GenerateNewDoc />
        </Route>
        <Route exact path="/new-doc">
          <GenerateNewDoc />
        </Route>
        <Route
          exact
          path="/doc/:id"
          render={({ match }) => {
            return <Editor />;
          }}
        />
      </Switch>
    </Router>
  );
};

export default App;
