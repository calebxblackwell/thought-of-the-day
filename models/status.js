const mongoose = require('mongoose');

const StatusSchema = new mongoose.Schema({
  text: String,
  date: Date,
  username: String
})

const Status = mongoose.model('Status', StatusSchema);

module.exports = Status;
