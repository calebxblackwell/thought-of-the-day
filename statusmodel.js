const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  status: {
    name: String,
    date: String,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {type: String, default: ''},
  lastName: {type: String, default: ''}
  //collection: "statuses"
});
module.exports = mongoose.model('User', UserSchema);
//this is the info that you need to keep passwords secure by never returning
//a password value, only username/firstName/lastName
//also used bcrypt js
UserSchema.methods.serialize = function() {
  return {
    username: this.username || '',
    firstName: this.firstName || '',
    lastName: this.lastName || ''
  };
};
UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};
