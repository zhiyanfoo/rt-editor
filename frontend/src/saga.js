import seedrandom from "seedrandom";
import superagent from 'superagent';

import { takeEvery, select, put, call } from "redux-saga/effects";
import { createCRDTInsertion, createCRDTDeletion } from "./crdt";
import {
  ActionType,
  setDocumentTag,
  localInsertion,
  localDeletion,
} from "./actions";
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
    JSON.stringify({
      type: "BROADCAST_INSERT",
      username,
      char: insertion,
    })
  );

  yield put(localInsertion(posIndex, insertion));
}

function* handleDeletion({ socket, username }, action) {
  const state = yield select(state => state.editor);

  const [posIndex, deletion] = createCRDTDeletion(action.pos, state.crdtText);

  socket.send(
    JSON.stringify({ type: "BROADCAST_DELETE", username, char: deletion })
  );

  yield put(localDeletion(posIndex));
}

function* GenerateNewDoc(_, action) {
  try {
    const result = yield call(
      () => superagent.post(`${HTTPS_BASE_URL}/document`)
    )
    const documentTag = JSON.parse(result.text).document_tag
    const url = `/doc/${documentTag}`
    console.log('newTab')
    console.log(action.newTab)
    if (action.newTab) {
      window.open(url, '_blank');
    }
    action.history.push(url)
    yield put(setDocumentTag(documentTag))
  } catch (err) {
    console.log(err)
  }
}

function* getCommands(action) {
  try {
    const result = yield call(
      () => superagent.get(`${HTTPS_BASE_URL}/commands`))
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
  yield takeEvery(ActionType.GenerateNewDoc, GenerateNewDoc, params);
  yield takeEvery(ActionType.GetCommands, getCommands, params);
}

export default handleInput;
