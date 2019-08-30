let express = require('express');
let router = express.Router();
let { genPasswordDigest } = require('../auth/helpers');
let Users = require('../db/users');

router.post("/signup", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    let user = {
      username,
      password, 
      password_digest: await genPasswordDigest(req.body.password),
      points: 0
    };

    let registeredUser = await Users.createUser(user);
    delete registeredUser.password_digest;
    res.json({
      payload: registeredUser,
      err: false
    })
  } catch (err) {
    next(err);
  }
})

module.exports = router;
