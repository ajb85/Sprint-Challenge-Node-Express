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

routes.post("/", async (req, res) => {
  try {
    // So they aren't users, they're projects!
    if (
      res.body.name &&
      res.body.description &&
      res.body.hasOwnProperty(completed)
    ) {
      const newProject = await db.insert(project);
      res.status(201).json(newProject);
    } else {
      res
        .status(400)
        .json({ message: "Please include name, description, and completed" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "I encountered an error adding the user" });
  }
});

routes.get("/:id", async (req, res) => {
  try {
    const project = await db.get(req.params.id);
    project
      ? res.status(200).json(project)
      : res.status(404).json({ message: "No project with that ID" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "" });
  }
});

routes.delete("/:id", async (req, res) => {
  try {
    const newProject = await db.insert(project);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "" });
  }
});

routes.put("/:id", async (req, res) => {
  try {
    const newProject = await db.insert(project);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "" });
  }
});

module.exports = routes;
