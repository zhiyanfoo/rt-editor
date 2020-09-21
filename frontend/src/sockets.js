import { WEBSOCKET_BASE_URL } from "./config";
import ReconnectingWebSocket from "reconnecting-websocket";

const setupSocket = (dispatch, username) => {
  const socket = new ReconnectingWebSocket(`${WEBSOCKET_BASE_URL}`);
  socket.onmessage = event => {
    const data = JSON.parse(event.data);

    switch (data.type) {
      case "BROADCAST_INSERT":
        dispatch(data);
        break;
      case "BROADCAST_DELETE":
        dispatch(data);
        break;
      default:
        break;
    }
  };

  return socket;
};

export default setupSocket;
