const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
const user = require('../models/userSchema.js');

module.exports = {
    name: 'add',
    category: 'write',
    description: 'adds an item to the to-do list',
    usage: `add`,
    async execute(message, args, command, client, Discord, db){
        //separate parameters
        var uid = message.author.id;


        user.countDocuments({uid: uid}, function (err, count){
          console.log(count);
          if(count===0){

            const newUser = new user({id: message.author.id, optIn: false, lastDate: "09/28/2003"});

            newUser.save();
          }
        });




        var index = 1;
        var date = new Date(args[0]);

        if(isNaN(date)){
          index = 0;
          //date = lastDate;
        }

        var taskName = "";
        while(args[index]){
          taskName += " " + args[index];
          index++;
        }

        //add comand to write to DB here

        const embed = new MessageEmbed()
        .setColor("GREEN")
        .setTitle('Added Task: \"' + taskName + "\" to " + date.toString().slice(0,15)); //add task name: read from DB
        //.setDescription(args[0]);

        message.channel.send(embed);
    }
}
