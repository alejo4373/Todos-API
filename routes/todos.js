const express = require('express');
const router = express.Router();
const db = require("../db/api");
const { loginRequired } = require('../auth/helpers');

router.get('/all', async (req, res, next) => {
  try {
    const todos = await db.getAllTodos();
    res.json({
      payload: todos,
      err: false
    })
  } catch (err) {
    next(err)
  }
});

router.post('/new', loginRequired, async (req, res, next) => {
  const { body, user } = req;
  const newTodo = {
    ...body,
    owner_id: user.id
  }

  try {
    const todo = await db.createTodo(newTodo);
    res.json({
      payload: todo,
      err: false
    })
  } catch (err) {
    next(err)
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const todo = await db.getTodo(id);
    res.json({
      payload: todo,
      err: false
    })
  } catch (err) {
    next(err)
  }
});

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedTodo = await db.removeTodo(id);
    res.json({
      payload: deletedTodo,
      err: false
    })
  } catch (err) {
    next(err)
  }
});

router.patch('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const updatedTodo = await db.updateTodo(id, req.body);
    res.json({
      payload: updatedTodo,
      err: false
    })
  } catch (err) {
    next(err)
  }
});

module.exports = router;
