const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  uid: String,
  tasks: [todo],
  optIn: Boolean,
  lastDate: Date
});
const user = mongoose.model('User', userSchema);
module.exports = user;
