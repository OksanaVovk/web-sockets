const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8082, clientTracking: true });

wss.on("connection", (connection) => {
  console.log("New client connected");
  connection.on("message", (message) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`${message}`);
      }
    });
  });
});

// Do not remove this export. wss should be the name of you WebSocket Server instance
module.exports = wss;
