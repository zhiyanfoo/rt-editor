// import { ActionTypes as types } from '../types'
import {
  onChange

} from './actions'

const setupSocket = (dispatch , username ) => {
  const socket = new WebSocket('ws://localhost:5000')

  socket.onopen = () => {
    socket.send(
      JSON.stringify({
        type: 'ADD_USER',
        name: username
      })
    )
  }

  socket.onmessage = event => {
    const data = JSON.parse(event.data)

    switch (data.type) {
      case 'COMMAND':
        dispatch(onChange())
        break
      default:
        break
    }
  }

  return socket
}

export default setupSocket
