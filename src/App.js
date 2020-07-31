import React from "react";
import CreateMessage from "./components/CreateMessage";
import Messages from "./components/Messages";

function App() {
  const [name, setName] = React.useState("Guest");
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <div style={{ padding: 20, textAlign: "center" }}>
        <label htmlFor="name">Name:</label>
        <input id="name" type="text" value={name} onChange={handleNameChange} />
      </div>
      <Messages />
      <CreateMessage name={name} />
    </div>
  );
}

export default App;
