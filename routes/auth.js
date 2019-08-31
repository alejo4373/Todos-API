let express = require('express');
let router = express.Router();
const passport = require('../auth/passport');
const { genPasswordDigest, loginRequired } = require('../auth/helpers');
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

    req.logIn(registeredUser, err => {
      if (err) return next(err)
      res.json({
        payload: {
          user: registeredUser,
          msg: "User registered and logged in",
        },
        err: false
      })
    })

  } catch (err) {
    // Username already taken 
    if (err.code === "23505" && err.detail.includes("already exists")) {
      res.status(409).json({
        payload: {
          msg: "Username not available. Please try a different one."
        },
        err: true
      })
    } else {
      next(err);
    }
  }
})

router.post("/login",  (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err)
    if (!user) {
      res.status(401).json({
        payload: {
          msg: "Wrong username or password"
        },
        err: true
      })
    }  else {
      req.logIn(user, err => {
        if (err) return next(err)
        res.json({
          payload: {
            user: req.user,
            msg: "Log-in successful",
          },
          err: false
        })
      })
    }
  })(req, res, next)
})

module.exports = router;
