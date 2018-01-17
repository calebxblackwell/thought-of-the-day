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
app.get("/", (request, response) => {
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
	for (let i = 0; i < requiredFields.lenth; i++) {
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

module.exports = {app, runServer, closeServer};
