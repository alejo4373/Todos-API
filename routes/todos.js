const express = require('express');
const router = express.Router();
const { Todos } = require("../db");
const { loginRequired } = require('../auth/helpers');

router.get('/all', loginRequired, async (req, res, next) => {
  let { user } = req
  try {
    const todos = await Todos.getAllTodos(user.id);
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
    const todo = await Todos.createTodo(newTodo);
    res.json({
      payload: todo,
      err: false
    })
  } catch (err) {
    next(err)
  }
});

router.get('/:id', loginRequired, async (req, res, next) => {
  const { id } = req.params;
  const owner_id = req.user.id

  try {
    const todo = await Todos.getTodo(id, owner_id);
    res.json({
      payload: todo,
      err: false
    })
  } catch (err) {
    next(err)
  }
});

router.delete('/:id', loginRequired, async (req, res, next) => {
  const { id } = req.params;
  const owner_id = req.user.id

  try {
    const deletedTodo = await Todos.removeTodo(id, owner_id);
    if (deletedTodo) {
      return res.json({
        payload: deletedTodo,
        err: false
      })
    }

    res.status(404).json({
      payload: {
        msg: "Todo not found"
      },
      err: true
    })
  } catch (err) {
    next(err)
  }
});

router.patch('/:id', loginRequired, async (req, res, next) => {
  const { id } = req.params;
  const owner_id = req.user.id
  const todo_edits = req.body
  try {
    const updatedTodo = await Todos.updateTodo(id, owner_id, todo_edits);
    if (updatedTodo) {
      return res.json({
        payload: updatedTodo,
        err: false
      })
    }

    res.status(404).json({
      payload: {
        msg: "Todo not found"
      },
      err: true
    })
  } catch (err) {
    next(err)
  }
});

module.exports = router;
