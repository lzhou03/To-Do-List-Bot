const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: String,
  date: Date,
  complete: Boolean,
  id: Number,
  rem: {type: Boolean, default: false}
});
const todo = mongoose.model('todo', taskSchema);
module.exports = todo;
