import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
  // Link
} from "react-router-dom";

import { GenerateNewPage } from "./generate-new-doc";
import Editor from "./components/Editor";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Editor />
        </Route>
        <Route exact path="/new-page">
          <GenerateNewPage />
        </Route>
        <Route
          exact
          path="/document/:id"
          render={({ match }) => {
            return <GenerateNewPage />;
          }}
        />
      </Switch>
    </Router>
  );
};

export default App;
