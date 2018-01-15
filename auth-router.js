const router = express.Router();
//this creates the token, and sets when it will expire.
const createAuthToken = function(user) {
  return jwt.sign({user}, config.JWT_SECRET, {
    subject: user.username,
    expiresIn: config.JWT_EXPIRY,
    algorithm: 'HS256'
  });
};
//this is the localAuth "strategy".
const localAuth = passport.authenticate('local', {session: false});//stops passport from using cookies.
router.use(bodyParser.json());
// This is when a user types in a username and password.
router.post('/login', localAuth, (req, res) => {
  const authToken = createAuthToken(req.user.serialize());
  res.json({authToken});
});

const jwtAuth = passport.authenticate('jwt', {session: false});

//This is when a user refreshes a valid token for a new one.
router.post('/refresh', jwtAuth, (req, res) => {
  const authToken = createAuthToken(req.user);
  res.json({authToken});
});

module.exports = {router};
