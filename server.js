const express = require("express");
const helmet = require("helmet");
const projectRoutes = require("./projects/projectRoutes.js");

const server = express();

server.use(express.json());
server.use(helmet());

server.use("/api/projects", projectRoutes);

server.get("/", (req, res) => {
  res.status(200).send("It's fine");
});

module.exports = server;
