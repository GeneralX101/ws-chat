import React from "react";

export default function Message({ id, name, message, createdat }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ marginBottom: 8 }}>
        <span style={{ fontWeight: "bold" }}>{name}</span>&nbsp;
        <span style={{ fontSize: 12 }}>{createdat}</span>
      </div>
      <div>{message}</div>
    </div>
  );
}
