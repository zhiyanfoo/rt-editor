import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { connect } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import setupSocket from './sockets'
import username from './username'
import handleInput from './saga'


const sagaMiddleware = createSagaMiddleware()

const createReducer = (
  initialState,
  handlers
) => (state = initialState, action) =>
  handlers.hasOwnProperty(action.type)
    ? handlers[action.type](state, action)
    : state

const editor = createReducer(
  {
    text: "asdf"
  },
  {
  }
)

const onChange = (editor, data, value) => {
  return {
    type: 'ON_CHANGE',
    editor,
    data,
    value
  }
}

const mapStateToProps = (state) => {
  return {text: state.text}
}


const mapDispatchToProps = {
  onChange,
}

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

const store = createStore(editor)
const socket = setupSocket(store.dispatch, username)
sagaMiddleware.run(handleInput, { socket, username })

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
