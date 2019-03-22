const express = require("express");

const routes = express.Router();

routes.get("/", (req, res) => {});

routes.post("/", (req, res) => {});

routes.get("/:id", (req, res) => {});

routes.delete("/:id", (req, res) => {});

routes.put("/:id", (req, res) => {});

module.exports = routes;
