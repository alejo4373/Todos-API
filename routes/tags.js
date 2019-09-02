const express = require('express');
const router = express.Router();
const { Journal }  = require("../db");

router.post('/new', async (req, res, next) => {
  let { name } = req.body
  try {
    const tagCreated = await Journal.createTag(name);
    res.json({
      payload: tagCreated,
      err: false
    })
  } catch (err) {
    next(err);
  }
})

module.exports = router;
