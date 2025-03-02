import { Server } from "socket.io";

let io;

export const initializeSocket = () => {
  io = new Server({
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

    socket.on("enrolled", ({ courseId }) => {
      io.emit("refresh", { courseId });
      log(courseId);
    });
    socket.on("dropped", ({ courseId }) => {
      io.emit("refresh", { courseId });
      log(courseId);
    });
  });

  io.on("disconnect", () => {
    // const { origin } = socket.handshake.headers;

    // if (origin.includes(process.env.CLIENT_URL)) {
    // }
    log("client disconnected");
  });

  return io;
};

export const getIO = () => {
  if (!io) throw new Error("Socket.io not initialized");

  return io;
};

const log = (message) => {
  console.log(`Socket: ${message}`);
};
