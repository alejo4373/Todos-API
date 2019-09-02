const express = require('express');
const router = express.Router();
const { Tags }  = require("../db");

router.post('/new', async (req, res, next) => {
  let { name } = req.body
  try {
    const tagCreated = await Tags.createTag(name);
    res.json({
      payload: tagCreated,
      err: false
    })
  } catch (err) {
    next(err);
  }
})

module.exports = router;
