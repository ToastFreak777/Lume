import { Server } from "socket.io";

export const setUpSocket = () => {
  // const server = createServer(app);
  // const io = new Server(server);
  const io = new Server({
    cors: {
      origin: process.env.CLIENT_URL,
    },
  });

  io.on("connection", (socket) => {
    // const { origin } = socket.handshake.headers;

    // if (origin.includes(process.env.CLIENT_URL)) {
    // }
    log("client connected");
    // console.log(socket.handshake.headers);

    socket.on("enrolled", () => {
      socket.emit("refresh");
    });
    socket.on("dropped", () => {
      socket.emit("refresh");
    });
  });

  io.on("disconnect", () => {
    // const { origin } = socket.handshake.headers;

    // if (origin.includes(process.env.CLIENT_URL)) {
    // }
    log("client disconnected");
  });

  io.listen(process.env.SOCKET_PORT);
};

const log = (message) => {
  console.log(`Socket: ${message}`);
};
