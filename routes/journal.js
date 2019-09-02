const express = require('express');
const router = express.Router();
const { Journal } = require("../db")

router.post('/add', async (req, res, next) => {
  try {
    const entry = await Journal.addEntry(req.body);
    res.json({
      payload: entry,
      err: false
    })
  } catch (err) {
    next(err);
  }
})

router.get('/entries', async (req, res, next) => {
  try {
    const entries = await Journal.getAllEntries();
    res.json({
      payload: entries,
      err: false
    })
  } catch (err) {
    next(err);
  }
})
module.exports = router;
