const express = require("express");
const cors = require("cors");
const database = require("./database");

const app = express();
app.use(express.json()); //anuntam aplicatia ca tot ce intra/iese o sa vrem sa fie json
app.use(cors());

// GET a resource, cerem ceva de la server, ex: lista de emailuri
app.get("/todos", async (req, res) => {
  // /=fara url segments, root, apoi o functie
  const todos = await database.listTodos();
  res.json(todos);
});

// SEND a resource
app.post("/todos", async (req, res) => {
  // const title = req.body.title;
  // const isCompleted = req.body.isCompleted;
  const { title, isCompleted } = req.body;

  await database.createTodo("title", isCompleted);
  res.json();
});

app.put("/todos/:id", async (req, res) => {
  // id: = accept orice id
  // const id = req.params.id;
  // const isCompleted = req.body.isCompleted;
  const { id } = req.params;
  const { isCompleted } = req.body;

  await database.updateTodo(id, isCompleted);
  res.json();
});

app.delete("/todos/:id", async (req, res) => {
  // const id = req.params.id;
  const { id } = req.params;
  await database.deleteTodo(id);
  res.json();
});

app.listen(8080);
