const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
const userSchema = require('../models/userSchema.js');


module.exports = {
    name: 'list',
    category: 'read',
    description: 'reads and prints the to-do list',
    usage: `list`,
    async execute(message, args, command, client, Discord, db){
        //check args
        var userid = message.author.id;

        if(!args[0]){ //DEFAULT LIST
          //list lastDate list
          const activeUser = await userSchema.findOne({ uid: userid }); // find user
          if (!activeUser) {
            return;
          }
          let taskList = '';
          let formattedTask = ''; // set up task collectors
          var date = activeUser.lastListDate;
          const reformattedDate = date.toString().slice(0,15);
          for (var i = 0; i < activeUser.tasks.length; i++) {
            if (activeUser.tasks[i].date.toString().slice(0,15) == reformattedDate) {
              formattedTask = i.toString() + ". "
              formattedTask += activeUser.tasks[i].name;
              if (activeUser.tasks[i].complete) {
                formattedTask = '~~' + formattedTask + '~~';
              } // assemble task line
              taskList += formattedTask + '\n'; // add task line to list // add task line to list

            }
          }

          const embed = new MessageEmbed()
          .setColor("#9B59B6")//purple
          .setTitle('__'+message.author.username+'\'s To-do '+date.toString().slice(0,15)+"__") // add date
          .setDescription(taskList);

          let thisMessage = await message.channel.send(embed);
          activeUser.lastList.set(0, thisMessage.guild.id);
          activeUser.lastList.set(1, thisMessage.channel.id);
          activeUser.lastList.set(2, thisMessage.id);
          activeUser.lastListDate = date;
          await activeUser.save();
          console.log(activeUser.lastList)

        }











        else if(args[0]==='all'){ // LIST ALL
          const activeUser = await userSchema.findOne({ uid: userid }); // find user
          if (!activeUser) {
            return;
          }
          let taskList = '';
          let formattedTask = ''; // set up task collectors

          for (var i = 0; i < activeUser.tasks.length; i++) {
            if(activeUser.tasks[i].date < date) {
              if (activeUser.tasks[i].complete){
                activeUser.tasks[i].remove();
              }
              else{
                activeUser.tasks[i].date = date;
              }
            }
            else {
              formattedTask = i.toString() + ". " //number
              formattedTask += activeUser.tasks[i].name;
              formattedTask += '- ' + activeUser.tasks[i].date.toString().slice(0,15);
              if (activeUser.tasks[i].complete) {
                formattedTask = '~~' + formattedTask + '~~';
              } // assemble task line
              taskList += formattedTask + '\n'; // add task line to list

            }

          }

          const embed = new MessageEmbed()
          .setColor("#9B59B6")
          .setTitle("__"+message.author.username+'\'s List of All Tasks__') // add date
          .setDescription(taskList);

          let thisMessage = await message.channel.send(embed);
          activeUser.lastListAll.set(0, thisMessage.guild.id);
          activeUser.lastListAll.set(1, thisMessage.channel.id);
          activeUser.lastListAll.set(2, thisMessage.id);
          //activeUser.lastListDate = date;
          await activeUser.save();
          console.log(activeUser.lastListAll)

        }










        else{ // LIST DATE
          var date = new Date(args[0]);
          if (isNaN(date)){
            const embed = new MessageEmbed()
            .setColor("#E74C3C")//dark red
            .setTitle('Invalid Date!')
            .setDescription(args[0]);

            message.channel.send(embed);
          }
          else{
            const activeUser = await userSchema.findOne({ uid: userid }); // find user
            if (!activeUser) {
              return;
            }
            let taskList = '';
            let formattedTask = ''; // set up task collectors
            var date = new Date(args[0]);
            const reformattedDate = date.toString().slice(0,15);
            for (var i = 0; i < activeUser.tasks.length; i++) {
              //check if task is outdated
              if(activeUser.tasks[i].date < date) {
                if (activeUser.tasks[i].complete){
                  activeUser.tasks[i].remove();
                }
                else{
                  activeUser.tasks[i].date = date;
                }
              }
              //GENERATE STRING
              if (activeUser.tasks[i].date.toString().slice(0,15) == reformattedDate) {
                formattedTask = i.toString() + ". "
                formattedTask += activeUser.tasks[i].name;
                if (activeUser.tasks[i].complete) {
                  formattedTask = '~~' + formattedTask + '~~';
                } // assemble task line
                taskList += formattedTask + '\n'; // add task line to list // add task line to list
              }

            }
            const embed = new MessageEmbed()
            .setColor("#9B59B6")//purple
            .setTitle("__"+message.author.username+'\'s To-do '+date.toString().slice(0,15)+"__") // add date
            .setDescription(taskList);

            let thisMessage = await message.channel.send(embed);
            activeUser.lastList.set(0, thisMessage.guild.id);
            activeUser.lastList.set(1, thisMessage.channel.id);
            activeUser.lastList.set(2, thisMessage.id);
            activeUser.lastListDate = date;
            await activeUser.save();
            console.log(activeUser.lastList)
          }
        }
    }
}
