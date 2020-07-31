import React from "react";

export default function CreateMessage({ name }) {
  const [isFetching, setIsFetching] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };
  const handleMessageSend = async (e) => {
    e.preventDefault();
    setIsFetching(true);
    try {
      const response = await fetch("http://localhost:8000/api/messages", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ name, message }),
      });
      await response.json();
      setMessage("");
      setIsFetching(false);
    } catch (err) {
      setIsFetching(false);
    }
  };

  return (
    <form onSubmit={handleMessageSend} style={{ display: "flex" }}>
      <input
        type="text"
        value={message}
        onChange={handleMessageChange}
        style={{ flex: 1 }}
      />
      <button type="submit" disabled={isFetching}>
        Send
      </button>
    </form>
  );
}
