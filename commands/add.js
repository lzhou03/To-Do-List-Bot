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
          var date = new Date(args[0]);
          var today = new Date();
          var argCount = 1;
//Date






          if(isNaN(date)){
            date = new Date();
            argCount = 0;

            while (args[argCount].toLowerCase() === "next") {
              date.setDate(date.getDate() + 7);
              argCount++;
            }

            switch (args[argCount].toLowerCase()) {
              case "monday":
                date.setDate(date.getDate() + ((1 + 7 - date.getDay()) % 7));
                argCount++;
                break;
              case "tuesday":
                date.setDate(date.getDate() + ((2 + 7 - date.getDay()) % 7));
                argCount++;
                break;
              case "wednesday":
                date.setDate(date.getDate() + ((3 + 7 - date.getDay()) % 7));
                argCount++;
                break;
              case "thursday":
                date.setDate(date.getDate() + ((4 + 7 - date.getDay()) % 7));
                argCount++;
                break;
              case "friday":
                date.setDate(date.getDate() + ((5 + 7 - date.getDay()) % 7));
                argCount++;
                break;
              case "saturday":
                date.setDate(date.getDate() + ((6 + 7 - date.getDay()) % 7));
                argCount++;
                break;
              case "sunday":
                date.setDate(date.getDate() + ((7 + 7 - date.getDay()) % 7));
                argCount++;
                break;

              default:
                index = 0;
                date = thisUser.lastDate;
                if (date < today) {
                  date = today;
                }
                break;
            }



          }
          else {
            thisUser.lastDate = date;
          }

          var taskName = "";
          while(args[argCount]){
            taskName += " " + args[argCount];
            argCount++;
          }

          //check for empty task name
          if(taskName === ""){
            const embed = new MessageEmbed()
            .setColor("RED")
            .setTitle("Please enter the name of your task."); //add task name: read from DB

            message.channel.send(embed);
          }
          console.log(date)

          const newTask = new task({name: taskName, date: date, complete: false, id: thisUser.tasks.length, rem: false})
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
