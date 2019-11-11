import { takeEvery, select, put } from 'redux-saga/effects'
import { handleCharInsert, handleCharDelete} from './crdt'

function* tada(params, action) {
  if (action.type === 'ON_BEFORE_CHANGE') {
    const username = params.username
    const state = yield select();
    if (action.data.origin === '+input') {
      const [posIndex, char] = handleCharInsert(state, action)
      params.socket.send(JSON.stringify({type: 'BROADCAST_INSERT', username, char}))
      yield put({type: 'LOCAL_INSERTION', index: posIndex, char})
      return
    }
    if (action.data.origin === '+delete') {
      const [do_delete, index] = handleCharDelete(state, action)
      if (!do_delete) {
        return false
      }
      const char = state.struct[index]
      console.log('char', char)
      params.socket.send(JSON.stringify({type: 'BROADCAST_DELETE', username, char}))
      yield put({type: 'LOCAL_DELETION', index})
      return
    }
  }
}

function* handleInput(params) {
  yield takeEvery("ON_BEFORE_CHANGE", tada, params)
}

export default handleInput
