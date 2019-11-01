import { takeEvery, select, put } from 'redux-saga/effects'
import { handleCharInsert, handleCharDelete} from './crdt'

function* tada(params, action) {
  console.log('tada')
  console.log(action)
  console.log(params)
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
      const index = handleCharDelete(state, action)
      const char = state.struct[index]
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
