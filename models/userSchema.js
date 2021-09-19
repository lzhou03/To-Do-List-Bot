const mongoose = require('mongoose');
const taskSchema = require('./taskSchema.js').schema;


const userSchema = new mongoose.Schema({
  uid: {type: Number, unique: true},
  tasks: [taskSchema],
  optIn: Boolean,
  lastDate: Date,
  lastList: [Number],
  lastListAll:[Number]
});
const user = mongoose.model('User', userSchema);
module.exports = user;
