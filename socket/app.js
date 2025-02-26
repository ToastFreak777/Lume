import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: process.env.CLIENT_URL,
  },
});

let connections = {
  client: "disconnected",
  server: "disconnected",
};

io.on("connection", (socket) => {
  const { origin } = socket.handshake.headers;

  if (origin.includes(process.env.CLIENT_URL)) {
    connections.client = "connected";
  } else if (origin.includes(process.env.SERVER_URL)) {
    connections.server = "connected";
  }
  console.log(connections);
  // console.log(socket.handshake.headers);
});

io.on("disconnect", () => {
  const { origin } = socket.handshake.headers;

  if (origin.includes(process.env.CLIENT_URL)) {
    connections.client = "disconnected";
  } else if (origin.includes(process.env.SERVER_URL)) {
    connections.server = "disconnected";
  }
  console.log(connections);
});

io.listen(process.env.PORT);
