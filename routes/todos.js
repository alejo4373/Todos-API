const express = require('express');
const router = express.Router();
const { Todos, Users, Helpers } = require("../db");
const { loginRequired } = require('../auth/helpers');

router.get('/', async (req, res, next) => {
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

router.post('/', async (req, res, next) => {
  const { body, user } = req;
  const newTodo = body
  const expectedProps = ["owner", "text"];
  const missingProps = Helpers.missingProps(expectedProps, newTodo)

  if (missingProps.length) {
    return res.status(400).json({
      payload: `Expected valid values for todo [${missingProps}]`,
      err: true
    })
  }

  try {
    const todo = await Todos.createTodo(newTodo);
    res.json({
      payload: todo,
      err: false
    })
  } catch (err) {
    if (typeof err === "string") {
      res.status(400).json({
        payload: err,
        err: true
      })
    } else {
      next(err)
    }
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  const owner = req.user.id

  try {
    const todo = await Todos.getTodo(id, owner);
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
  const owner = req.user.id

  try {
    const deletedTodo = await Todos.removeTodo(id, owner);
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

router.patch('/:id', async (req, res, next) => {
  const { id } = req.params;
  const owner = req.user.id
  const todo_edits = req.body
  try {
    const updatedTodo = await Todos.updateTodo(id, owner, todo_edits);
    let awardedUser;
    if (updatedTodo) {
      if (updatedTodo.completed) {
        awardedUser = await Users.awardPoints(owner, updatedTodo.value)
      }
      return res.json({
        payload: updatedTodo,
        user: awardedUser,
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
