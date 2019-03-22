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
    res.status(500).json({
      message: "Internal error trying to get that project, try again"
    });
  }
});

routes.delete("/:id", async (req, res) => {
  try {
    const project = await db.remove(req.params.id);
    project
      ? res.status(200).end()
      : res.status(404).json({ message: "No project found with that ID" });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal error trying to delete that project, try again"
    });
  }
});

routes.put("/:id", async (req, res) => {
  try {
    if (
      res.body.name &&
      res.body.description &&
      res.body.hasOwnProperty(completed)
    ) {
      const project = await db.insert(req.params.id, req.body);
      project
        ? res.status(200).json(project)
        : res.status(404).json({ message: "No project found at that ID" });
    } else {
      res
        .status(400)
        .json({
          message:
            "I need name, description, and completed to update that project."
        });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "" });
  }
});

module.exports = routes;
