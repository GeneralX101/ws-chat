require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const logger = require("morgan");
const bodyParser = require("body-parser");
const db = require("./db");

const app = express();
const router = express.Router();
const server = http.createServer(app);
const io = require("socket.io")(server);

const getMessages = router.get("/api/messages", async function (req, res) {
  const messages = await db.any("SELECT * from messages");
  res.status(200).json(messages);
});
const createMessage = router.post("/api/messages", async function (
  req,
  res,
  next
) {
  const { name, message } = req.body;
  if (!name || !message) {
    const err = new Error("Name and message are required");
    err.status = 422;
    return next(err);
  }

  const result = await db.one(
    "INSERT INTO messages(name, message) VALUES($1, $2) RETURNING id, name, message, createdat",
    [name, message]
  );
  io.emit("new message", { data: result });
  res.status(201).json(result);
});

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(cors());
app.use(getMessages);
app.use(createMessage);
app.use(function (req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});
app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({
    status: "error",
    message: err.message || "Internal Server Error",
  });
});

server.listen(process.env.PORT || 8000);
