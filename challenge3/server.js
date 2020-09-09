// server.js

const express = require("express");
const fs = require("fs");
const path = require("path");
const taskManager = require("./taskManager");

const app = express();

app.set("port", 3000);

app.use("/", express.static(path.join(__dirname, "public")));

app.get("/api/tasks", (req, res) => {
  res.json(taskManager.getAll());
});

app.get("/api/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = taskManager.get(id);

  if (task) {
    res.json(task);
  } else {
    res.status(404).end();
  }
});

app.post("/api/tasks", (req, res) => {
  const title = req.query.title;
  const task = taskManager.add(title);
  
  if (task) {
    res.status(201).json(task);
  } else {
    res.status(400).end();
  }
});

app.put("/api/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const title = req.query.title; 
  const isDone = req.query.isDone === "true"; 
  const task = taskManager.update({ id, title, isDone });

  if (task) {
    res.status(201).json(task);
  } else {
    res.status(400).end();
  }
});

app.delete("/api/contacts/:id", (req, res) => {
  const id = Number(req.params.id);
  const deleted = taskManager.remove(id);

  if (deleted) {
    res.status(204).end();
  } else {
    res.status(400).end();
  }
});

app.listen(app.get("port"), () => {
  console.log(`Server listening at: http://localhost:${app.get("port")}/`);
});


