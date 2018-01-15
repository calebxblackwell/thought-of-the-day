//set up local authentication strategy.
//strategy gets username and password from req.body
//and passes them to a callback function which checks the credentials
//against the values stored in the database.
const { Strategy: LocalStrategy } = require('passport-local');
const { JWT_SECRET } = require('./config');
const { User } = require ('./statusmodel');
//const { User } = require ('./auth-router');
//this is the local authentication strategy.
const localStrategy = new LocalStrategy((username, password, callback) => {
  let user;
//looking for a user with the username provided
  User.findOne({ username: username })
    .then(_user => {
      user = _user;
      if (!user) {
        return Promise.reject({
          reason: 'LoginError',
          message: 'Incorrect username or password'
        });
      }
//then if we find one, return the validatePassword method and promise.
      return user.validatePassword(password);
    })
    .then(isValid => {
      if (!isValid) {
        return Promise.reject({
          reason: 'LoginError',
          message: 'Incorrect username or password'
        });
      }
      return callback(null, user);
    })
    .catch(err => {
      if (err.reason === 'LoginError') {
        return callback(null, false, err);
      }
      return callback(err, false);
    });
});
module.exports = { localStrategy, };//jwtStrategy };
