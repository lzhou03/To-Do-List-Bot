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
        var doneMessage = "";
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
            selectedTask.complete = !selectedTask.complete; // checks or unchecks item from list
            await activeUser.save(); // saves change to database
          }
          var username = await client.users.cache.get(uid.toString()).username;
          if(selectedTask.complete){
            if (uid === "198545820696444940") {
              username = "FWED, the thiccest of milves";
            }
            doneMessage = "Nice Work, "+username+"!\ncrossed off ~~" + taskNum.toString() + '. ' + name + "~~"
          }
          else{
            doneMessage = "Uncrossed Task " + taskNum.toString() + '. ' + name;
          }

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
