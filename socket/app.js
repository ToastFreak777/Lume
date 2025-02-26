import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: process.env.CLIENT_URL,
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");
});

io.listen("4000");
