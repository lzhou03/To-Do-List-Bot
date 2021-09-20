const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
const userSchema = require('../models/userSchema.js');

module.exports = {
    name: 'edit',
    category: 'write',
    description: 'edits an item from the to-do list',
    usage: `edit`,
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
          var index = 1;
          var taskName = "";
          while(args[index]){
            taskName += " " + args[index]; //get name string
            index++;
          }

          const activeUser = await userSchema.findOne({ uid: uid }); // find user
          const selectedTaskID = activeUser.tasks[taskNum]._id; // find task to remove
          const selectedTask = activeUser.tasks.id(selectedTaskID);
          const date = new Date(selectedTask.date);//get date
          const name1 = selectedTask.name; // get original name
          //const name2 = taskName; // new name
          selectedTask.name = taskName; // change name
          await activeUser.save(); // saves change to database

          const embed = new MessageEmbed()
          .setColor("YELLOW")
          .setTitle("Removed " + args[0] + " from "+date.toString().slice(0,15)) //add task name, task date
          .setDescription('changed ' + taskNum.toString() + '. ' + name1 + ' to ' + taskName);

          message.channel.send(embed);
          client.commands.get("update").execute(message, args, command, client, Discord, db);
        }
    }
}
