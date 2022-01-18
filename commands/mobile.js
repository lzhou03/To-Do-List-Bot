const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
const userSchema = require('../models/userSchema.js');


module.exports = {
    name: 'mobile',
    category: 'write',
    description: 'toggle width',
    usage: `mobile`,
    async execute(message, args, command, client, Discord, db){

      const activeUser = await userSchema.findOne({uid: message.author.id}); // find user

      var state = "ON";
      var stateEmo = "📱";

      if (activeUser.mobile){
        activeUser.mobile = false;
        await activeUser.save()
        state="OFF"
        stateEmo="💻"
        console.log("desktop")
      }
      else {
        activeUser.mobile = true;
        await activeUser.save()
        console.log("mobi")
      }



      const embed = new MessageEmbed()
      .setColor("BLUE")
      .setTitle(message.author.username+": Mobile View "+state+" "+stateEmo) //add task name

      message.channel.send(embed);
      client.commands.get("update").execute(message, args, command, client, Discord, db);



    }
  }
