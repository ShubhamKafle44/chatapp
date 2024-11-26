import { io } from "socket.io-client";
import React, { useEffect, useState } from "react";
import { Message } from "./Message";
const socket = io(import.meta.env.VITE_WS_URL, {
  path: import.meta.env.VITE_PATH,
});

export const Chat = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
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
    socket.on("chat", (data) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { ...data, type: "chat" },
      ]);
    });
  }, []);

  return (
    <>
      <h2>status: {isConnected ? "connected" : "disconnected"}</h2>
      <div>
        {messages.map((message, index) => (
          <Message message={message} key={index} />
        ))}
        <input
          type="text"
          id="message"
          onChange={(event) => {
            const value = event.target.value.trim();
            setMessage(value);
          }}
        ></input>
        <button
          onClick={() => {
            if (message && message.length) {
              socket.emit("chat", message);
            }
            var messageBox = document.getElementById("message");
            messageBox.value = "";
            setMessage("");
          }}
        >
          Send
        </button>
      </div>
    </>
  );
};
