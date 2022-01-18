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
      var taskNum = args[0];

      if (args[0]%1 !== 0){
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
      else if (args[1]%1 !== 0){
        const embed = new MessageEmbed()
        .setColor("RED")
        .setTitle("Please specify the interval in minutes.");

        message.channel.send(embed);
        return;
      }
      else{

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

        if (activeUser.rem) {
          var time = args[1]*60*1000
          const remArgs = [uid, selectedTask._id, time];
          client.commands.get("remind").execute(message, remArgs, command, client, Discord)
        }



        var toggleText = "Reminders ";
        var toggleEmo = " 🔕"
        if(selectedTask.rem) {
          toggleText+="ON";
          toggleEmo = " 🔔"
        }
        else {
          toggleText+="OFF";
        }
        const embed = new MessageEmbed()
        .setColor("#FFFF00")
        .setTitle( toggleText+" for Task: "+args[0] + " 🔔") //add task name
        .setDescription("REEEE");

        message.channel.send(embed);
        client.commands.get("update").execute(message, args, command, client, Discord, db);
      }
    }
    }
}
