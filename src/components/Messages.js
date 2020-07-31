import React from "react";
import openSocket from "socket.io-client";
import Message from "./Message";

export default function Messages() {
  const [messages, setMessages] = React.useState([]);
  const [isFetching, setIsFetching] = React.useState(false);

  React.useEffect(() => {
    const socket = openSocket("http://localhost:8000");
    socket.on("new message", (data) => {
      setMessages((msgs) => [...msgs, data.data]);
    });
  }, []);

  React.useEffect(() => {
    const fetchMessages = async () => {
      setIsFetching(true);
      try {
        const response = await fetch("http://localhost:8000/api/messages");
        const result = await response.json();
        setIsFetching(false);
        setMessages(result);
      } catch (err) {
        setIsFetching(false);
      }
    };
    fetchMessages();
  }, []);

  return (
    <div style={{ flex: 1 }}>
      {isFetching ? (
        <div style={{ textAlign: "center" }}>
          <p>Loading..</p>
        </div>
      ) : messages.length ? (
        messages.map((message) => <Message key={message.id} {...message} />)
      ) : (
        <div style={{ textAlign: "center" }}>
          <p>No messages!</p>
        </div>
      )}
    </div>
  );
}
