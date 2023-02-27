const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// get all todos
router.get('/', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// create a new todo
router.post('/', async (req, res) => {
  const todo = new Todo({
    text: req.body.text
  });
  await todo.save();
  res.json(todo);
});

// delete a todo
router.delete('/:id', async (req, res) => {
  const result = await Todo.findByIdAndDelete(req.params.id);
  res.json({result});
});

// complete a todo
router.put('/:id/complete', async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  todo.complete = !todo.complete;
  await todo.save();
  res.json(todo);
});

// update a todo
router.put('/:id', async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  todo.text = req.body.text;
  await todo.save();
  res.json(todo);
});

module.exports = router;
