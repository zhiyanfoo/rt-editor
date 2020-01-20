const setupSocket = (dispatch, username) => {
  const socket = new WebSocket("ws://localhost:5000");

  socket.onopen = () => {
    socket.send(
      JSON.stringify({
        type: "ADD_USER",
        name: username
      })
    );
  };
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
