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
          const selectedTaskID = activeUser.tasks[taskNum]._id; // find task to remove
          const selectedTask = activeUser.tasks.id(selectedTaskID);
          const date = new Date(selectedTask.date);//get date
          const name = selectedTask.name; // get name
          activeUser.tasks.id(selectedTask).remove(); // remove item at taskNum
          await activeUser.save(); // saves change to database
          console.log(date);

          const embed = new MessageEmbed()
          .setColor("YELLOW")
          .setTitle("Removed " + args[0] + " from "+date.toString().slice(0,15)) //add task name, task date
          .setDescription('removed ' + taskNum.toString() + '. ' + name + ' - ' + date.toString().slice(0,15));

          message.channel.send(embed);
        }
    }
}
