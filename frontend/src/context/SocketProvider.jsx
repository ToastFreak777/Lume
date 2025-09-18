import { useEffect, useState } from "react";

import { SocketContext } from "./store";

import { io } from "socket.io-client";

const URL = import.meta.env.VITE_SOCKET_URL;
// const URL = process.env.SOCKET_ENV === "production" ? undefined : "http://localhost:4000";

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io(URL));
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
