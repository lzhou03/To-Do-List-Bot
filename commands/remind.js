const mongoose = require('mongoose');
const userSchema = require('../models/userSchema.js');
const task = require('../models/taskSchema.js');


module.exports = {
    name: 'remind',
    category: 'write',
    description: 'reminder DM',
    usage: `remind`,
    async execute(message, args, command, client, Discord, db){

      const activeUser = await userSchema.findOne({ uid: args[0] }); // find user
      const selectedTask = activeUser.tasks._id(args[1]);

      setInterval(function () {
        client.users.cache.get(args[0]).send("You have a task due soon: "+selectedTask.name);
      }, args[2]);

    }
  }
