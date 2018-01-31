const express = require('express');
const mongoose = require('mongoose');
const Status= require ('./models/status');
const bodyParser = require('body-parser');
const passport = require('passport');
const app = express();
const User = require ('./models/user');
const jwt = require('jsonwebtoken');
const config = require('./config');
mongoose.connect('mongodb://localhost:27017/full-stack-capstone');
app.use(express.static('public'));
app.use(bodyParser.json());
//
const {localStrategy, jwtStrategy} = require ('./strategy');
passport.use(localStrategy);
passport.use(jwtStrategy);
//console.log('before Status.create')
//
app.get("/status", (request, response) => {
		console.log('I got a GET request');
    response.sendFile(__dirname + '/public/index.html');
});
//GET request all statuses from the database.
app.get('/status', (req, res) => {
	Status.find()
		.then(status => {
			res.json(status);
		})
		.catch(err => {
			console.error(err);
			res.status(500).json({
				error: 'something went wrong'
			});
		})
	});
//end get request
//POST a new status.
app.post('/status', (req, res) => {
		const requiredFields = ['date', 'text'];
		for(let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`
            console.error(message);
            return res.status(400).send(message);
					}
			}
		Status
		.create({
			text : req.body.text,
			date : req.body.date,
			username: "name name"
		})
		.then(status => res.status(201).json(status))
		.catch(err => {
				console.error(err);
				res.status(500).json({
						error: 'Something went wrong'
				});
		});
});
//end POST endpoint
let server;

//creating a new user
app.post('/user', (req,res) => {

  let {username, password } = req.body;
  // Username and password come in pre-trimmed, otherwise we throw an error
  // before this

  return User.find({username})
    .count()
    .then(count => {
      if (count > 0) {
        // There is an existing user with the same username
        return Promise.reject({
          code: 422,
          reason: 'ValidationError',
          message: 'Username already taken',
          location: 'username'
        });
      }
      // If there is no existing user, hash the password
      return User.hashPassword(password);
    })
    .then(hash => {
      return User.create({
        username,
        password: hash,
      });
    })
    .then(user => {
      return res.status(201).json(user.serialize());
    })
    .catch(err => {
      // Forward validation errors on to the client, otherwise give a 500
      // error because something unexpected has happened
      if (err.reason === 'ValidationError') {
        return res.status(err.code).json(err);
      }
      res.status(500).json({code: 500, message: 'Internal server error'});
    });
	});

//user sign in area
const createAuthToken = function(user) {
  return jwt.sign({user}, config.JWT_SECRET, {
    subject: user.username,
    expiresIn: config.JWT_EXPIRY,
    algorithm: 'HS256'
  });
};
const localAuth = passport.authenticate('local', {session: false});
app.post('/users/signin', localAuth, (req, res) => {
	const authToken = createAuthToken(req.user.serialize());
  res.json({authToken});
});
//below is info to run the server and close the server
function runServer() {
    const port = process.env.PORT || 8080;
    return new Promise((resolve, reject) => {
        server = app.listen(port, () => {
            console.log(`Your app is listening on port ${8080}`);
            resolve(server);
        }).on('error', err => {
            reject(err);
        });
    });
}
function closeServer() {
    return new Promise((resolve, reject) => {
        console.log('Closing server');
        server.close(err => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
}

if (require.main === module) {
    runServer().catch(err => console.error(err));
}
module.exports = {runServer, app, closeServer};
