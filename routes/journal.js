const express = require('express');
const router = express.Router();
const { Journal } = require("../db")
const { loginRequired } = require("../auth/helpers")

router.post('/add', loginRequired, async (req, res, next) => {
  const newEntry = {
    ...req.body,
    owner_id: req.user.id
  }

  try {
    const entry = await Journal.addEntry(newEntry);
    res.json({
      payload: entry,
      err: false
    })
  } catch (err) {
    next(err);
  }
})

router.get('/entries', loginRequired, async (req, res, next) => {
  let owner_id = req.user.id
  try {
    const entries = await Journal.getAllEntries(owner_id);
    res.json({
      payload: entries,
      err: false
    })
  } catch (err) {
    next(err);
  }
})
module.exports = router;
