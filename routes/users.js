let express = require('express');
let router = express.Router();
let { Users, Helpers } = require('../db');

router.post("/signup", async (req, res, next) => {
  const { username } = req.body;
  if (Object.keys(req.body).length > 1) {
    return res.status(500).json({
      payload: 'ERROR: The server did not expect more than one field in the body',
      err: true
    })
  }

  if (!username || !username.trim()) {
    return res.status(400).json({
      payload: "Expected a `username` field  with a valid string in the body",
      err: true
    })
  }

  try {
    let user = {
      username,
    };

    let registeredUser = await Users.createUser(user);
    res.status(201).json({
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

router.get('/', async (req, res, next) => {
  try {
    const users = await Users.getAll();
    res.json({
      payload: users,
      err: false
    })
  } catch (err) {
    next(err)
  }
});

router.get('/:username', async (req, res, next) => {
  let { username } = req.params
  try {
    const user = await Users.getUserByUsername(username);
    if (!user) { return next(user) }
    res.json({
      payload: user,
      err: false
    })
  } catch (err) {
    next(err)
  }
});

router.all('/', (req, res, next) => {
  res.status(405).json({
    payload: `Oops! ${req.method} method is is not allowed here`,
    err: true
  })
})

module.exports = router;
