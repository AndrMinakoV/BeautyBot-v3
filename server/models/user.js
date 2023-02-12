var mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: String,
  _id: Number,
  first_name: String,
  last_name: String,
  created: Date,
  contact: String,
  balance: { type: Number, default: 0 },
  isBanned: { type: Boolean, default: false },
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
