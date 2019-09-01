const express = require('express');
const router = express.Router();
const db = require("../db/api");
const { loginRequired } = require('../auth/helpers');

router.get('/all', loginRequired, async (req, res, next) => {
  let { user } = req
  try {
    const todos = await db.getAllTodos(user.id);
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

router.get('/:id', loginRequired, async (req, res, next) => {
  const { id } = req.params;
  const owner_id = req.user.id

  try {
    const todo = await db.getTodo(id, owner_id);
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
    const deletedTodo = await db.removeTodo(id, owner_id);
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
