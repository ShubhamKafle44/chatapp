import { io } from "socket.io-client";
import React, { useEffect, useState } from "react";
import { Message } from "./Message";
const socket = io(import.meta.env.VITE_WS_URL, {
  path: import.meta.env.VITE_PATH,
});

export const Chat = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(socket.connect());
      console.log(socket);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("join", (data) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { ...data, type: "join" },
      ]);
    });
  }, []);

  return (
    <>
      <h2>status: {isConnected ? "connected" : "disconnected"}</h2>
      <div>
        <Message />
      </div>
    </>
  );
};
