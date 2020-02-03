import seedrandom from "seedrandom";
import superagent from 'superagent';
import { push } from 'connected-react-router'

import { takeEvery, select, put, call } from "redux-saga/effects";
import { createCRDTInsertion, createCRDTDeletion } from "./crdt";
import { ActionType } from "./actions";
import { HTTPS_BASE_URL } from './config'
import { documentTagfromPath } from './helpers'


function* handleInsertion({ socket, username }, action) {
  const state = yield select();
  const editor = state.editor
  const router = state.router
  const documentTag = documentTagfromPath(router.location.pathname)

  // impure
  const rng = new seedrandom(Math.random().toString());

  const [posIndex, insertion] = createCRDTInsertion(
    rng,
    action.char,
    action.pos,
    editor.struct
  );

  socket.send(
    JSON.stringify({
      type: "BROADCAST_INSERT",
      username,
      char: insertion,
      documentTag,
    })
  );

  yield put({ type: "LOCAL_INSERTION", index: posIndex, char: insertion });
}

function* handleDeletion({ socket, username }, action) {
  const state = yield select();
  const editor = state.editor

  const [posIndex, deletion] = createCRDTDeletion(action.pos, editor.struct);

  socket.send(
    JSON.stringify({ type: "BROADCAST_DELETE", username, char: deletion })
  );

  yield put({ type: "LOCAL_DELETION", index: posIndex });
}

function* generateDocumentIdHttps() {
  try {
    const result = yield call(
      superagent.post,
      `${HTTPS_BASE_URL}/generate_document`)
    const documentTag = JSON.parse(result.text).document_tag
    yield put(push(`/document/${documentTag}`))
  } catch (err) {
    console.log(err)
  }
}

function* handleInput(params) {
  yield takeEvery(ActionType.InputDeletion, handleDeletion, params);
  yield takeEvery(ActionType.InputInsertion, handleInsertion, params);
  yield takeEvery(ActionType.GenerateDocumentHttps, generateDocumentIdHttps, params);
}

export default handleInput;
