const express = require('express');
const mongoose = require('mongoose');
const Status= require ('./statusmodel');
const bodyParser = require('body-parser');
const passport = require('passport');
const app = express();
mongoose.connect('mongodb://localhost:27017/full-stack-capstone');
app.use(express.static('public'));
app.use(bodyParser.json());
//
const localStrategy = require ('./strategy').localStrategy;
const jwtStrategy = require ('./strategy').jwtStrategy;
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
  console.log(req.body);
	const requiredFields = ['date', 'text'];
	for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`
            console.error(message);
            return res.status(400).send(message);
					}
			}
		Status.create({
			textbox : req.body.text,
			date : req.body.date,
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
//creating a new user
app.post('/user', (req,res) => {
  let username = req.body.username;
  username = username.trim();
  let password = req.body.password;
  password = password.trim();
  bcrypt.genSalt(10, (err,salt) => {
    if (err) {
      return res.status(500).json({
        message: 'Internal server error'
      });
    }
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) {
        return res.status(500).json({
          message: 'error' +err
        });
      }
      User.create({
                username,
                password: hash,
            }, (err, item) => {
                if (err) {
                    return res.status(500).json({
                        message: 'error 98' + err
                    });
                }
                if (item) {
                    console.log(`User \`${username}\` created.`);
                    return res.json(item);
                }
            });
        });
    });
});
//user sign in area
app.post('/users/signin', (req, res) => {
    const user = req.body.username;
    const pw = req.body.password;
    User
        .findOne({
            username: req.body.username
        },  (err, items) => {
            if (err) {
                return res.status(500).json({
                    message: "Internal server error"
                });
            }
            if (!items) {
                return res.status(401).json({
                    message: "Not found!"
                });
            } else {
                items.validatePassword(req.body.password, (err, isValid) => {
                    if (err) {
                        console.log('Error validating password.');
                    }
                    if (!isValid) {
                        return res.status(401).json({
                            message: "Not found"
                        });
                    } else {
                        var logInTime = new Date();
                        console.log("Logged in: " + req.body.username + ' at ' + logInTime);
                        return res.json(req.body.username);
                    }
                });
            };
        });
});

module.exports = {runServer, app, closeServer};
