const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
const User = require('../models/userSchema.js');
const task = require('../models/taskSchema.js');
const userSchema = require('../models/userSchema.js');

module.exports = {
    name: 'add',
    category: 'write',
    description: 'adds an item to the to-do list',
    usage: `add`,
    async execute(message, args, command, client, Discord, db){

        var userid = message.author.id;

//if user doesn't exist, add new user
        var count = await User.countDocuments({uid: userid})
          if(count===0){

            const newUser = new User({uid: userid, optIn: false, lastDate: "09/28/2003"});

            newUser.save();
          }


          var thisUser = await userSchema.findOne({ uid : userid });

//separate parameters
          var index = 1;
          var date = new Date(args[0]);
          var today = new Date();
//Date
          switch (args[0]) {
            case "monday":
              date.setDate(d.getDate() + ((1 + 7 - d.getDay()) % 7));
              break;
            case "tuesday":
              date.setDate(d.getDate() + ((2 + 7 - d.getDay()) % 7));
              break;
            case "wednesday":
              date.setDate(d.getDate() + ((3 + 7 - d.getDay()) % 7));
              break;
            case "thursday":
              date.setDate(d.getDate() + ((4 + 7 - d.getDay()) % 7));
              break;
            case "friday":
              date.setDate(d.getDate() + ((5 + 7 - d.getDay()) % 7));
              break;
            case "saturday":
              date.setDate(d.getDate() + ((6 + 7 - d.getDay()) % 7));
              break;
            case "sunday":
              date.setDate(d.getDate() + ((7 + 7 - d.getDay()) % 7));
              break;

          }}





          if(isNaN(date)){
            index = 0;
            date = thisUser.lastDate;
            if (date < today) {
              date = today;
            }
          }
          else {
            thisUser.lastDate = date;
          }

          var taskName = "";
          while(args[index]){
            taskName += " " + args[index];
            index++;
          }

          //check for empty task name
          if(taskName === ""){
            const embed = new MessageEmbed()
            .setColor("RED")
            .setTitle("Please enter the name of your task."); //add task name: read from DB

            message.channel.send(embed);
          }

          const newTask = new task({name: taskName, date: date, complete: false, id: thisUser.tasks.length})
          thisUser.tasks.push(newTask);
          await thisUser.save();

          const embed = new MessageEmbed()
          .setColor("GREEN")
          .setTitle('Added Task: \"' + taskName + "\" to " + date.toString().slice(0,15)) //add task name: read from DB
          //.setDescription('added ' + taskName + ' - ' + date.toString().slice(0,15));

          message.channel.send(embed);
          client.commands.get("update").execute(message, args, command, client, Discord, db);

  }
}
