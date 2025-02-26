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

  if (origin.includes("5173")) {
    connections.client = "connected";
  } else if (origin.includes("8080")) {
    connections.server = "connected";
  }
  console.log(connections);
  // console.log(socket.handshake.headers);
});

io.on("disconnect", () => {
  const { origin } = socket.handshake.headers;

  if (origin.includes("5173")) {
    connections.client = "disconnected";
  } else if (origin.includes("8080")) {
    connections.server = "disconnected";
  }
  console.log(connections);
});

io.listen("4000");
