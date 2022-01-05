const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
const userSchema = require('../models/userSchema.js');


module.exports = {
    name: 'update',
    category: 'edit message',
    description: 'updates printed to-do list',
    usage: `update`,
    async execute(message, args, command, client, Discord, db){
        //check arguments
        var userid = message.author.id;
        const activeUser = await userSchema.findOne({ uid: userid }); // find user
        if (!activeUser) {
          return;
        }
        activeUser.tasks.find({}).sort('date').exec((err, docs) => {});
        //UPDATE LAST DAYLIST

        if (activeUser.lastList[1] != "" || activeUser.lastList[1].isNaN()){
          console.log(activeUser.lastList)
          let taskList = '';
          let formattedTask = ''; // set up task collectors
          var date = activeUser.lastListDate;
          const reformattedDate = date.toString().slice(0,15);
          for (var i = 0; i < activeUser.tasks.length; i++) {
            //console.log(activeUser.tasks[i].date);
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


          if (activeUser.lastList[1] != ""){
            let thisMessage = await client.channels.cache.get(activeUser.lastList[1]).messages.fetch(activeUser.lastList[2]);
            //console.log(thisMessage);activeUser.lastList[1] != ""
            thisMessage.edit(embed);
          }
        }

        // UPDATE LAST ALL LIST

        console.log(activeUser.lastListAll)
        taskList = '';
        formattedTask = ''; // set up task collectors
        for (var i = 0; i < activeUser.tasks.length; i++) {
          formattedTask = i.toString() + ". "
          formattedTask += activeUser.tasks[i].name;
          formattedTask += '- ' + activeUser.tasks[i].date.toString().slice(0,15);
          if (activeUser.tasks[i].complete) {
            formattedTask = '~~' + formattedTask + '~~';
          } // assemble task line
          taskList += formattedTask + '\n'; // add task line to list
        }
        const embed2 = new MessageEmbed()
        .setColor("#9B59B6")
        .setTitle('__'+message.author.username+'\'s List of All Tasks__') // add date
        .setDescription(taskList);


        if (activeUser.lastListAll[1] != ""){
          let thisMessage2 = await client.channels.cache.get(activeUser.lastListAll[1]).messages.fetch(activeUser.lastListAll[2]);

          //console.log(thisMessage2);
          thisMessage2.edit(embed2);
        }
    }
}
