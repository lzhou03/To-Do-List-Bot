const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
const userSchema = require('../models/userSchema.js');

module.exports = {
    name: 'done',
    category: 'write',
    description: 'edits todo list message and database status',
    usage: `done`,
    async execute(message, args, command, client, Discord){
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

        const embed = new MessageEmbed()
        .setColor("#FFFF00")
        .setTitle("You've completed Task: "+args[0] + "!") //add task name
        .setDescription("Nice Work!");

        message.channel.send(embed);

      }



    }
}
