import { history } from './navigation'
import { createStore, applyMiddleware, compose } from "redux";
import { createRootReducer } from './reducers'
import createSagaMiddleware from "redux-saga";
import { routerMiddleware } from 'connected-react-router';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  createRootReducer(history),
  composeEnhancers(
    applyMiddleware(
      sagaMiddleware,
      routerMiddleware(history)
    )
  )
);
