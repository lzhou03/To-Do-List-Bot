const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
const userSchema = require('../models/userSchema.js');

module.exports = {
    name: 'list',
    category: 'read',
    description: 'reads and prints the to-do list',
    usage: `list`,
    async execute(message, args, command, client, Discord){
        //check args
        if(!args[0]){
          //list todays list
          const embed = new MessageEmbed()
          .setColor(process.env.COLOR)
          .setTitle('List: '+args[0]) // add date
          .setDescription(args[0]);

          message.channel.send(embed);


        }
        else if(args[0]==='all'){
          const activeUser = await user.find({ uid: uid }); // find user
          let taskList = '';
          let formattedTask = ''; // set up task collectors
          for (var i = 0; i < activeUser.tasks.length; i++) {
            formattedTask = activeUser[i].name;
            formattedTask += ' (id:' + activeUser[i].id.toString() + ', date:' + activeUser[i].date.toString() + ')';
            if (activeUser[i].complete) {
              formattedTask = '~~' + formattedTask + '~~'
            } // assemble task line
            taskList += formattedTask + '\n'; // add task line to list
          }

          const embed = new MessageEmbed()
          .setColor("#9B59B6")
          .setTitle('List of All Tasks ') // add date
          .setDescription(taskList);

          message.channel.send(embed);



        }
        else{
          var date = new Date(args[0]);
          if (isNaN(date)){
            const embed = new MessageEmbed()
            .setColor("#E74C3C")//dark red
            .setTitle('Invalid Date!')
            .setDescription(args[0]);

            message.channel.send(embed);
          }
          else{
            const activeUser = await user.find({ uid: uid }); // find user
            let taskList = '';
            let formattedTask = ''; // set up task collectors
            for (var i = 0; i < activeUser.tasks.length; i++) {
              if (activeUser[i].date == date) {
                formattedTask = activeUser[i].name;
                formattedTask += ' (id:' + activeUser[i].id.toString() + ')';
                if (activeUser[i].complete) {
                  formattedTask = '~~' + formattedTask + '~~'
                } // assemble task line
                taskList += formattedTask + '\n'; // add task line to list
              }
            }

            const embed = new MessageEmbed()
            .setColor("#9B59B6")//purple
            .setTitle('__To-do '+date.toString().slice(0,15)+"__") // add date
            .setDescription(taskList);

            message.channel.send(embed);
          }

        }

    }
}
