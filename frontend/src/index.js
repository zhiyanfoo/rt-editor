import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import setupSocket from "./sockets";
import username from "./username";
import handleInput from "./saga";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { store, sagaMiddleware } from './configureStore'

const socket = setupSocket(store.dispatch, username);
sagaMiddleware.run(handleInput, { socket, username });

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
