const express = require('express');
const router = express.Router();
const { Tags }  = require("../db");
const { loginRequired } = require("../auth/helpers");

router.post('/new', loginRequired, async (req, res, next) => {
  const newTag = {
    name: req.body.name,
    owner_id: req.user.id
  }

  try {
    const tagCreated = await Tags.createTag(newTag);
    res.json({
      payload: tagCreated,
      err: false
    })
  } catch (err) {
    next(err);
  }
})

module.exports = router;
