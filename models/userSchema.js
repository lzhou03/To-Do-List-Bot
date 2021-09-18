const mongoose = require('mongoose');
const taskSchema = require('./taskSchema.js').schema;


const userSchema = new mongoose.Schema({
  uid: Number,
  tasks: [taskSchema],
  optIn: Boolean,
  lastDate: Date
});
const user = mongoose.model('User', userSchema);
module.exports = user;
