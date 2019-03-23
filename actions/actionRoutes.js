const express = require("express");
const db = require("../data/helpers/actionModel.js");
const pdb = require("../data/helpers/projectModel.js");

const routes = express.Router();

routes.get("/", async (req, res) => {
  try {
    const actions = await db.get();
    res.status(200).json(actions);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Sorry, something went wrong fetching that list" });
  }
});

routes.post("/", async (req, res) => {
  try {
    let validProject = await verifyProjectID(req.body.project_id);
    if (!validProject) {
      res
        .status(400)
        .json({ message: "No project at that ID" })
        .end();
    } else {
      if (req.body.description.length > 128) {
        console.log("Length too long");
        res
          .status(400)
          .json({ message: "Description must be under 128 characters" });
      }
      if (req.body.notes && req.body.description) {
        const completed = req.body.hasOwnProperty("completed")
          ? req.body.completed
          : false;
        const newAction = await db.insert({
          ...req.body,
          completed
        });
        res.status(201).json(newAction);
      } else {
        res.status(400).json({ message: "Please include notes, description" });
      }
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "I encountered an error adding the action" });
  }
});

routes.get("/:id", async (req, res) => {
  try {
    const action = await db.get(req.params.id);
    action
      ? res.status(200).json(action)
      : res.status(404).json({ message: "No action with that ID" });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal error trying to get that action, try again"
    });
  }
});

routes.delete("/:id", async (req, res) => {
  try {
    const action = await db.remove(req.params.id);
    action
      ? res.status(200).end()
      : res.status(404).json({ message: "No action found with that ID" });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal error trying to delete that action, try again"
    });
  }
});

routes.put("/:id", async (req, res) => {
  try {
    let validProject = await verifyProjectID(req.body.project_id);
    if (!validProject) {
      res
        .status(400)
        .json({ message: "No project at that ID" })
        .end();
    } else {
      if (req.body.description.length > 128) {
        console.log("Length too long");
        res
          .status(400)
          .json({ message: "Description must be under 128 characters" });
      }
      if (req.body.notes && req.body.description) {
        const project = await db.update(req.params.id, req.body);
        project
          ? res.status(200).json(project)
          : res.status(404).json({ message: "No project found at that ID" });
      } else {
        res.status(400).json({
          message:
            "I need name, description, and completed to update that project."
        });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal error trying to update that project, try again"
    });
  }
});

module.exports = routes;

async function verifyProjectID(id) {
  if (id === undefined) return false;
  try {
    const project = await pdb.get(id);
    return project ? true : false;
  } catch (err) {
    return false;
  }
}
