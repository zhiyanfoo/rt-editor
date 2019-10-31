import { takeEvery } from 'redux-saga/effects'

function* handleInput(params: { socket: WebSocket; username: string }) {
  yield takeEvery("INPUT", action => {
    action.author = params.username
    params.socket.send(JSON.stringify(action))
  })
}

export default handleInput

