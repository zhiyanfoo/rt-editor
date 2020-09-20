import seedrandom from "seedrandom";
import superagent from "superagent";

import { takeEvery, select, put, call } from "redux-saga/effects";
import { createCRDTInsertion, createCRDTDeletion } from "./crdt";
import {
  ActionType,
  localInsertion,
  localDeletion,
  setDocumentTag
} from "./actions";
import { HTTPS_BASE_URL } from "./config";

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
      document_tag: action.documentTag,
      char: insertion
    })
  );

  yield put(localInsertion(posIndex, insertion));
}

function* handleDeletion({ socket, username }, action) {
  const state = yield select(state => state.editor);

  const [posIndex, deletion] = createCRDTDeletion(action.pos, state.crdtText);

  socket.send(
    JSON.stringify({
      type: "BROADCAST_DELETE",
      username,
      char: deletion,
      document_tag: action.documentTag
    })
  );

  yield put(localDeletion(posIndex));
}

function* GenerateNewDoc({ socket }) {
  try {
    const result = yield call(() =>
      superagent.post(`${HTTPS_BASE_URL}/document`)
    );
    const documentTag = JSON.parse(result.text).document_tag;
    console.log("documentTag saga");
    console.log(documentTag);
    yield put(setDocumentTag(documentTag));
  } catch (err) {
    console.log(err);
  }
}

function* getCommands(_, action) {
  console.log("action");
  console.log(action);
  try {
    const result = yield call(() =>
      superagent.get(`${HTTPS_BASE_URL}/commands/${action.documentTag}`)
    );
    const commands = JSON.parse(result.text).commands;
    yield put({ type: ActionType.InsertCommands, commands });
  } catch (err) {
    console.log(err);
  }
}

function* addSocket({ socket }, action) {
  yield socket.send(
    JSON.stringify({
      type: "ADD_SOCKET",
      document_tag: action.documentTag
    })
  );
}

function* handleInput(params) {
  yield takeEvery(ActionType.InputDeletion, handleDeletion, params);
  yield takeEvery(ActionType.InputInsertion, handleInsertion, params);
  yield takeEvery(ActionType.GenerateNewDoc, GenerateNewDoc, params);
  yield takeEvery(ActionType.GetCommands, getCommands, params);
  yield takeEvery(ActionType.AddSocket, addSocket, params);
}

export default handleInput;
