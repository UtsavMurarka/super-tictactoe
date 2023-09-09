const express = require("express");
const socket = require("socket.io");

// App setup
const PORT = 5000;
const app = express();
const server = app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});

// Static files
app.use(express.static("public"));

// Socket setup
const io = socket(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    //   allowedHeaders: ["my-custom-header"],
    //   credentials: true
    }
});

io.on("connection", function (socket) {
  console.log("Made socket connection");

  socket.on("cellClick", function (data) {
    console.log(data);
  });
});