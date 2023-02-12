const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
  login: String,
  password: String,
  isSuper: { type: Boolean, default: false },
});

const AdminModel = mongoose.model('Admin', adminSchema);

module.exports = AdminModel;
