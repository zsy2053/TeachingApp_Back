var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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

UserSchema.pre('save', (next) => {
  var user = this
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      return next(err)
    }
    user.password = hash
    next()
  })

  bcrypt.hash(user.passwordconfirm, 10, (err, hash) => {
    if (err) {
      return next(err)
    }
    user.passwordconfirm = hash
    next()
  })
})

module.exports = mongoose.model('User', UserSchema);
