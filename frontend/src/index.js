import React from "react";
import { createBrowserHistory } from 'history'
import ReactDOM from "react-dom";
import { connectRouter } from 'connected-react-router'
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { routerMiddleware } from 'connected-react-router';
import { combineReducers } from 'redux';
// import codemirror then our styles
import "codemirror/lib/codemirror.css";
import "./index.css";

import App from "./App";
import * as serviceWorker from "./serviceWorker";
import setupSocket from "./sockets";
import username from "./username";
import handleInput from "./saga";
import {
  editor
} from "./reducers";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

const sagaMiddleware = createSagaMiddleware();

const history = createBrowserHistory()

const rootReducer = combineReducers(
  {
    editor,
    router: connectRouter(history),
  }
)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(
      sagaMiddleware,
      routerMiddleware(history)
    )
  )
);

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
