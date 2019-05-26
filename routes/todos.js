const express = require('express');
const router = express.Router();
const db = require("../db/api");

router.get('/', async (req, res, next) => {
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

module.exports = router;
