let express = require('express');
let router = express.Router();
let { Users, Helpers } = require('../db');

router.post("/signup", async (req, res, next) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({
      payload: `Expected valid values for user [username]`,
      err: true
    })
  }

  try {
    let user = {
      username,
    };

    console.log("body =>", req.body)
    let registeredUser = await Users.createUser(user);
    console.log("user =>", registeredUser)
    res.json({
      payload: {
        user: registeredUser,
        msg: "User created",
      },
      err: false
    })
  } catch (err) {
    if (typeof err === "string") {
      res.status(409).json({
        payload: {
          msg: err
        },
        err: true
      })
    } else {
      next(err);
    }
  }
})

router.all('/', (req, res, next) => {
  res.status(405).json({
    payload: "Nah, nah, nah",
    err: true
  })
})

module.exports = router;
