const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
const userSchema = require('../models/userSchema.js');
const task = require('../models/taskSchema.js');

module.exports = {
    name: 'date',
    category: 'date',
    description: 'edit date',
    usage: `date`,
    async execute(message, args, command, client, Discord, db){
      var userid = message.author.id;

//find user
    var uid = message.author.id;
    var taskNum = args[0];
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
    else {

      const selectedTask = activeUser.tasks[taskNum];

//separate parameters
        var date = new Date(args[1]);
        var argCount = 1;
//Date






        if(isNaN(date)){
          date = new Date();
          argCount = 1;

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
              const embed = new MessageEmbed()
              .setColor("RED")
              .setTitle('invalid date')
              message.channel.send(embed);
              return;
              break;
          }



        }

        console.log("new date: "+date)

        activeUser.tasks[taskNum].date = date;
        activeUser.tasks[taskNum].name = taskName;
        await activeUser.save();

        const embed = new MessageEmbed()
        .setColor("GREEN")
        .setTitle('Edited Date for: \"' + taskName + "\" to " + date.toString().slice(0,15)) //add task name: read from DB
        //.setDescription('added ' + taskName + ' - ' + date.toString().slice(0,15));

        message.channel.send(embed);
        client.commands.get("update").execute(message, args, command, client, Discord, db);
      }

}
}
