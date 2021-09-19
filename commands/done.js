const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
const userSchema = require('../models/userSchema.js');

module.exports = {
    name: 'done',
    category: 'write',
    description: 'edits todo list message and database status',
    usage: `done`,
    async execute(message, args, command, client, Discord, db){
      //check arguments


      var uid = message.author.id;

      if (args[0]%1 !== 0){
        const embed = new MessageEmbed()
        .setColor("RED")
        .setTitle("Please specify the task ID number.");

        message.channel.send(embed);
      }
      else{
        var taskNum = args[0];
        //update completion status in db
        const activeUser = await userSchema.findOne({ uid: uid }); // find user
        if (activeUser) {
          const selectedTask = await activeUser.tasks[taskNum]; // find task
          const date = new Date(selectedTask.date);//get date
          const name = selectedTask.name; // get name
          if (selectedTask) {
            selectedTask.complete = !selectedTask.complete; // checks or unchecks item from list
            await activeUser.save(); // saves change to database
          }

        const embed = new MessageEmbed()
        .setColor("#FFFF00")
        .setTitle("You've completed Task: "+args[0] + "!") //add task name
        .setDescription("Nice Work!\ncrossed off ~~" + taskNum.toString() + '. ' + name + ' - ' + date + "~~");

        message.channel.send(embed);
      }
    }
  }
}
