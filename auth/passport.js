const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("../models/User");

// import model
passport.use(
  new localStrategy(async function (username, password, done) {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(function (id, done) {
  User.findOne({ _id: id })
    .then((user) => {
      console.log(user);
      done(null, user);
    })
    .catch((err) => {
      console.log(err);
      done(err, false);
    });
});

module.exports = passport;
