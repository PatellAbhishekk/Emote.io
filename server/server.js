const http = require("http");
const express = require("express");

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 3001;

const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("emoji", (data) => {
    console.log(data);

    socket.broadcast.emit("new_emoji", data);
  });
});

app.get("/", (req, res) => {
  res.send("Service is active");
});

server.listen(PORT, () => {
  console.log(`Server is active at: ${PORT}`);
});
