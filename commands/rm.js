const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
const userSchema = require('../models/userSchema.js');

module.exports = {
    name: 'rm',
    category: 'write',
    description: 'removes an item from the to-do list',
    usage: `rm`,
    async execute(message, args, command, client, Discord, db){
        //check arguments
        var uid = message.author.id;
        if (args[0]%1!== 0){
          const embed = new MessageEmbed()
          .setColor("RED")
          .setTitle("Please specify the task ID number.");

          message.channel.send(embed);
        }
        else{
          var taskNum = args[0];

          const activeUser = await userSchema.findOne({ uid: uid }); // find user
          const selectedTask = activeUser.tasks[taskNum]._id; // find task to remove
          activeUser.tasks.id(selectedTask).remove(); // remove item at taskNum
          await activeUser.save(); // saves change to database

          const embed = new MessageEmbed()
          .setColor("YELLOW")
          .setTitle("Removed " + args[0] + " from "); //add task name, task date

          message.channel.send(embed);
        }
    }
}
