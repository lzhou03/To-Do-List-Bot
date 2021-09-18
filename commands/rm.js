const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
const userSchema = require('../models/userSchema.js').schema;

module.exports = {
    name: 'rm',
    category: 'write',
    description: 'removes an item from the to-do list',
    usage: `rm`,
    async execute(message, args, command, client, Discord){
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
          const embed = new MessageEmbed()
          .setColor("YELLOW")
          .setTitle("Removed " + args[0] + " from "); //add task name, task date

          message.channel.send(embed);
        }

        //add comand to write to DB here


    }
}
