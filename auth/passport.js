const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { comparePasswords } = require('../auth/helpers');
const { Users } = require('../db');
const { errors } = require('../db/pgp');

passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    const user = await Users.getUserByUsername(username);
    if (!user) {
      return done(null, false, { message: "username doesn't exists" })
    }

    const passMatch = await comparePasswords(password, user.password_digest);
    if (!passMatch) {
      return done(null, false, { message: "invalid password" })
    } 

    delete user.password_digest;
    done(null, user);

  } catch (err) {
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
