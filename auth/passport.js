const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { comparePasswords } = require('../auth/helpers');
const Users = require('../db/users');
const { errors } = require('../db');

passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    let user = await Users.getUserByUsername(username);
    let passMatch = await comparePasswords(password, user.password_digest);
    delete user.password_digest;

    if (!passMatch) {
      done(null, false, { message: "invalid password" })
    } else {
      done(null, user);
    }

  } catch (err) {
    if (err instanceof errors.QueryResultError) {
      if (err.code === errors.queryResultErrorCode.noData) {
        return done(null, false, { message: "username doesn't exists" })
      }
    }
    done(err)
  }
}))

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser(async (user, done) => {
  try {
    let retrievedUser = await Users.getUserById(user.id)
    delete retrievedUser.password_digest;
    done(null, retrievedUser)
  } catch (err) {
    done(err, false)
  }
})

module.exports = passport;
