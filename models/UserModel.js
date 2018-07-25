var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: {
    type: String,
    required: 'Please enter the username',
    unique: true
  },
  email: {
    type: String,
    required: 'Please enter your email address',
    unique: true
  },
  status: {
    type: [{
      type: String,
      enum: ['teacher', 'student']
    }]
  }
});

module.exports = mongoose.model('User', UserSchema);
