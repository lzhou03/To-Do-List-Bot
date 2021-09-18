const mongoose = require('mongoose');
const taskSchema = require('taskSchema.js')

const userSchema = new mongoose.Schema({
  uid: String,
  tasks: [taskSchema],
  optIn: Boolean,
  lastDate: Date
});
const user = mongoose.model('User', userSchema);
