const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
const userSchema = require('../models/userSchema.js');


module.exports = {
    name: 'mobile',
    category: 'write',
    description: 'toggle width',
    usage: `mobile`,
    async execute(message, args, command, client, Discord, db){

      const activeUser = await userSchema.findOne({ uid: args[0] }); // find user

      var state = "ON";
      var stateEmo = "📱";

      if (activeUser.mobile){
        activeUser.mobile = false
        state="OFF"
        stateEmo="💻"
      }
      else {
        activeUser.mobile = true
      }



      const embed = new MessageEmbed()
      .setColor("BLUE")
      .setTitle(message.author.username+": Mobile View "+state+" "+stateEmo) //add task name

      message.channel.send(embed);
      client.commands.get("update").execute(message, args, command, client, Discord, db);



    }
  }
