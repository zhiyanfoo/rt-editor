import { takeEvery, select, put } from "redux-saga/effects";
import seedrandom from "seedrandom";

import { createCRDTInsertion, createCRDTDeletion } from "./crdt";
import { ActionType } from "./actions";

function* handleInsertion({ socket, username }, action) {
  const state = yield select();

  // impure
  const rng = new seedrandom(Math.random().toString());

  const [posIndex, insertion] = createCRDTInsertion(
    rng,
    action.char,
    action.pos,
    state.struct
  );

  socket.send(
    JSON.stringify({ type: "BROADCAST_INSERT", username, char: insertion })
  );

  yield put({ type: "LOCAL_INSERTION", index: posIndex, char: insertion });
}

function* handleDeletion({ socket, username }, action) {
  const state = yield select();

  const [posIndex, deletion] = createCRDTDeletion(action.pos, state.struct);

  socket.send(
    JSON.stringify({ type: "BROADCAST_DELETE", username, char: deletion })
  );

  yield put({ type: "LOCAL_DELETION", index: posIndex });
}

function* handleInput(params) {
  yield takeEvery(ActionType.InputDeletion, handleDeletion, params);
  yield takeEvery(ActionType.InputInsertion, handleInsertion, params);
}

export default handleInput;
