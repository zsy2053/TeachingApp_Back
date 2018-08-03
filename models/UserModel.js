var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  passwordconfirm: {
    type: String,
    required: true
  },
  status: {
    type: [{
      type: String,
      required: true,
      enum: ['teacher', 'student']
    }]
  }
});

UserSchema.pre('save', async function(next) {
  var user = this
  const salt = await bcrypt.genSalt(10)
  const passwordHash = await bcrypt.hash(user.password, salt)
  const passwordConfirmHash = await bcrypt.hash(user.passwordconfirm, salt)
  user.password = passwordHash
  user.passwordconfirm = passwordConfirmHash
  next()
})

module.exports = mongoose.model('User', UserSchema);
