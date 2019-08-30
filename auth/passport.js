const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { comparePasswords } = require('../auth/helpers');
const Users = require('../db/users');

passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    let user = await Users.getUserByUsername(username);
    let passMatch = await comparePasswords(password, user.password_digest);
    if (!passMatch) {
      done(null, false, { message: "invalid password" })
    }
    delete user.password_digest;
    return done(null, user);
  }
  catch (err) {
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
