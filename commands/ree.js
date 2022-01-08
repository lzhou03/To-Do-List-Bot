const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
const userSchema = require('../models/userSchema.js');

module.exports = {
    name: 'ree',
    category: 'write',
    description: 'reminder',
    usage: `ree`,
    async execute(message, args, command, client, Discord, db){
      var uid = message.author.id;

      if (args[0]%1 !== 0){
        const embed = new MessageEmbed()
        .setColor("RED")
        .setTitle("Please specify the task ID number.");

        message.channel.send(embed);
      }
      else{
        var taskNum = args[0];
        var reeMessage = "";
        //update completion status in db
        const activeUser = await userSchema.findOne({ uid: uid }); // find user
        if (activeUser) {
          const selectedTask = await activeUser.tasks[taskNum]; // find task
          if (!selectedTask) {
            return;
          }
          const date = new Date(selectedTask.date);//get date
          const name = selectedTask.name; // get name
          if (selectedTask) {
            if (selectedTask.rem){
              selectedTask.rem = false;
            }
            else {
              selectedTask.rem = true;
            }
            await activeUser.save(); // saves change to database
          }
          var username = await client.users.cache.get(uid.toString()).username;


        const embed = new MessageEmbed()
        .setColor("#FFFF00")
        .setTitle("You've completed Task: "+args[0] + "!") //add task name
        .setDescription(doneMessage);

        message.channel.send(embed);
        client.commands.get("update").execute(message, args, command, client, Discord, db);
      }
    }
    }
}
