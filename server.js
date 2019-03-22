const express = require("express");
const helmet = require("helmet");
const userRoutes = require("./users/userRoutes.js");

const server = express();

server.use(express.json());
server.use(helmet());

server.use("/api/users", userRoutes);

server.get("/", (req, res) => {
  res.status(200).send("It's fine");
});

module.exports = server;
