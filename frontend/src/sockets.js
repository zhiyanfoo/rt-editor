// import { ActionTypes as types } from '../types'
import { Dispatch } from 'redux'

const setupSocket = (dispatch , username ) => {
  const socket = new WebSocket('ws://localhost:8989')

  socket.onopen = () => {
    socket.send(
      JSON.stringify({
        type: 'ADD_USER',
        name: username
      })
    )
  }

  // socket.onmessage = event => {
  //   console.log(event)
  //   const data = JSON.parse(event.data)
  //   console.log(data)

  //   switch (data.type) {
  //     case types.NEW_MESSAGE:
  //       dispatch(messageRecieved(data.message, data.author, data.id))
  //       break
  //     case types.ADD_USER:
  //       dispatch(addUser(data.name))
  //       break
  //     case types.REMOVE_USER:
  //       dispatch(removeUser(data.name))
  //       break
  //     case types.USERS:
  //       dispatch(populateUsersList(data.users))
  //       break
  //     case types.MESSAGES:
  //       dispatch(populateMessagesList(data.messages))
  //       break
  //     default:
  //       break
  //   }
  // }

  return socket
}

export default setupSocket
