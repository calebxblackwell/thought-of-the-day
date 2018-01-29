//set up local authentication strategy.
//strategy gets username and password from req.body
//and passes them to a callback function which checks the credentials
//against the values stored in the database.
const { Strategy: LocalStrategy } = require('passport-local');
const { JWT_SECRET } = require('./config');
const User = require ('./models/user');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
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
      console.log(username);
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
const jwtStrategy = new JwtStrategy(
  {
    secretOrKey: 'access_token',
    // Look for the JWT as a Bearer auth header
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
    // Only allow HS256 tokens - the same as the ones we issue
    algorithms: ['HS256']
  },
  (payload, done) => {
    done(null, payload.user);
  }
);

module.exports = { localStrategy, jwtStrategy };
