const hostname = window.location.hostname
console.log(hostname)
export const HTTPS_BASE_URL = `http://${hostname}:5001`;
export const WEBSOCKET_BASE_URL = `ws://${hostname}:5000`;
