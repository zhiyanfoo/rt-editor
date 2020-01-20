import { takeEvery, select, put } from "redux-saga/effects";
import seedrandom from "seedrandom";

import { createCRDTInsertion, createCRDTDeletion } from "./crdt";

function* tada(params, action) {
  const username = params.username;
  const state = yield select();

  if (action.origin === "+insert") {
    // impure
    const rng = new seedrandom(Math.random().toString());

    const [posIndex, insertion] = createCRDTInsertion(
      rng,
      action.char,
      action.pos,
      state.struct
    );

    params.socket.send(
      JSON.stringify({ type: "BROADCAST_INSERT", username, char: insertion })
    );

    yield put({ type: "LOCAL_INSERTION", index: posIndex, char: insertion });

    return;
  }

  if (action.origin === "+delete") {
    const [posIndex, deletion] = createCRDTDeletion(action.pos, state.struct);

    params.socket.send(
      JSON.stringify({ type: "BROADCAST_DELETE", username, char: deletion })
    );

    yield put({ type: "LOCAL_DELETION", index: posIndex });

    return;
  }
}

function* handleInput(params) {
  yield takeEvery("INPUT", tada, params);
}

export default handleInput;
