const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/full-stack-capstone');
const Status = require('./userModel');
app.use(express.static('public'));
app.use(bodyParser.json());
//GET request
app.get('/status', (req,res) =>{
  const status = [
    {status:'status update'}
  ]
  res.json(status)
});
//end get request
//POST endpoint
app.post('/status', (req,res) => {
  const newStatus = new Status();

  newStatus.name = req.body.text
  newStatus.date = req.body.date
  newStatus.save((error, status) => {
    if(error){
      res.send(error)
    } else{
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
