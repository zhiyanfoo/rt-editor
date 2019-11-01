import { takeEvery } from 'redux-saga/effects'

function* handleInput(params) {
  yield takeEvery("ON_BEFORE_CHANGE", action => {
    console.log(action)
    const data = {
      author: params.username,
      type: 'ON_BEFORE_CHANGE',
    }

    params.socket.send(JSON.stringify(data))
  })
}

export default handleInput
