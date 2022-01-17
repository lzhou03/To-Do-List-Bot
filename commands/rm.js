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
        const activeUser = await userSchema.findOne({ uid: uid });
        if (args[0]%1!== 0){
          const embed = new MessageEmbed()
          .setColor("RED")
          .setTitle("Please specify the task ID number.");

          message.channel.send(embed);
          return;
        }
        else if (taskNum < 0 || taskNum > activeUser.tasks.length - 1) {
          const embed = new MessageEmbed()
          .setColor("RED")
          .setTitle("Task ID number out of range.");

          message.channel.send(embed);
          return;
        }
        else{
          var taskNum = args[0];

           // find user
          // find task to remove
          const selectedTask = activeUser.tasks[taskNum]
          console.log(selectedTask.name + " " + selectedTask.date)
          const date = new Date(selectedTask.date);//get date
          const name = selectedTask.name; // get name
          activeUser.tasks = activeUser.tasks.splice(taskNum, 1); // remove item at taskNum
          await activeUser.save(); // saves change to database

          const embed = new MessageEmbed()
          .setColor("YELLOW")
          .setTitle("Removed " + args[0] + " from "+date.toString().slice(0,15)) //add task name, task date
          .setDescription('removed ' + taskNum.toString() + '. ' + name + ' - ' + date.toString().slice(0,15));

          message.channel.send(embed);
          client.commands.get("update").execute(message, args, command, client, Discord, db);
        }
    }
}
