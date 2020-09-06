import seedrandom from "seedrandom";
import superagent from 'superagent';

import { takeEvery, select, put, call } from "redux-saga/effects";
import { createCRDTInsertion, createCRDTDeletion } from "./crdt";
import { ActionType } from "./actions";
import { HTTPS_BASE_URL } from './config'


function* handleInsertion({ socket, username }, action) {
  const state = yield select(state => state.editor);

  // impure
  const rng = new seedrandom(Math.random().toString());

  const [posIndex, insertion] = createCRDTInsertion(
    rng,
    action.char,
    action.pos,
    state.crdtText
  );

  socket.send(
    JSON.stringify({ type: "BROADCAST_INSERT", username, char: insertion })
  );

  yield put({ type: "LOCAL_INSERTION", index: posIndex, char: insertion });
}

function* handleDeletion({ socket, username }, action) {
  const state = yield select(state => state.editor);

  const [posIndex, deletion] = createCRDTDeletion(action.pos, state.crdtText);

  socket.send(
    JSON.stringify({ type: "BROADCAST_DELETE", username, char: deletion })
  );

  yield put({ type: "LOCAL_DELETION", index: posIndex });
}

function* generateDocumentIdHttps() {
  try {
    const result = yield call(
      superagent.post(`${HTTPS_BASE_URL}/document`).type('json')
      )
    const document_tag = JSON.parse(result.text)
    yield put({type: ActionType.GoToDocumentPage, document_tag})
  } catch (err) {
    console.log(err)
  }
}

function* getCommands(action) {
  try {
    const result = yield call(
      () => superagent.get(`${HTTPS_BASE_URL}/document`))
    const commands = JSON.parse(result.text).commands
    yield put({type: ActionType.InsertCommands, commands})
  }
  catch (err) {
    console.log(err)
  }
}

function* handleInput(params) {
  yield takeEvery(ActionType.InputDeletion, handleDeletion, params);
  yield takeEvery(ActionType.InputInsertion, handleInsertion, params);
  yield takeEvery(ActionType.GenerateDocumentHttps, generateDocumentIdHttps, params);
  yield takeEvery(ActionType.GetCommands, getCommands, params);
}

export default handleInput;
