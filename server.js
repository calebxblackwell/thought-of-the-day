const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Status= require ('./statusmodel');
const bodyParser = require('body-parser');
const passport = require('passport');
mongoose.connect('mongodb://localhost:27017/full-stack-capstone');
app.use(express.static('public'));
app.use(bodyParser.json());
//
const localStrategy = require ('./strategy').localStrategy;
const jwtStrategy = require ('./strategy').jwtStrategy;
//
//GET request
//this get request is now /protected so you need the JWT to access.
app.get('/status/protected', (req, res) => {
	Status.find({}, (err, status) => {
		if (err) {
			res.send(err)
		} else {
			res.json(status)
		}
	});
});
//end get request
//POST endpoint
app.post('/status', (req, res) => {
  //req.body;
	const newStatus = new Status();
	newStatus.name = req.body.text
	newStatus.date = req.body.date
	newStatus.save((error, status) => {
		if (error) {
			res.send(error)
		} else {
			res.json(status)
		}
	})
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

module.exports = {app, runServer, closeServer};
