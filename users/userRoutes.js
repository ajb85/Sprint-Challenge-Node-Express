const express = require("express");
const db = require("../data/helpers/projectModel.js");

const routes = express.Router();

routes.get("/", async (req, res) => {
  try {
    const users = await db.get();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Sorry, something went wrong fetching that list" });
  }
});

routes.post("/", (req, res) => {});

routes.get("/:id", (req, res) => {});

routes.delete("/:id", (req, res) => {});

routes.put("/:id", (req, res) => {});

module.exports = routes;
