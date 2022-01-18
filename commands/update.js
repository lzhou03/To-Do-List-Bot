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
        activeUser.tasks = activeUser.tasks.sort((a, b) => a.date - b.date);
        for (var i; i< activeUser.tasks.length;i++) {
          activeUser.tasks[i].id = i;
        }
        //UPDATE LAST DAYLIST

        if (activeUser.lastList[1] != "" || activeUser.lastList[1]){
          console.log(activeUser.lastList)



          let taskList = '';
          let formattedTask = ''; // set up task collectors
          let dateList='';

          var today = new Date();
          var date = activeUser.lastListDate;
          if (date < today) {
            date = today;
          }
          const reformattedDate = date.toString().slice(0,15);
          for (var i = 0; i < activeUser.tasks.length; i++) {
            //check if task is outdated
            if(activeUser.tasks[i].date < date) {
              if (activeUser.tasks[i].complete){
                activeUser.tasks[i].remove();
                continue;
              }
              else {
                activeUser.tasks[i].date = date;
              }
            }
            //GENERATE STRING
            if (activeUser.tasks[i].date.toString().slice(0,15) == reformattedDate) {
              dateList += activeUser.tasks[i].date.toString().slice(0,10) + "\n";
              formattedTask = i + ". " //number
              formattedTask += activeUser.tasks[i].name;
              if (activeUser.mobile) { //25 char wrap
                if(formattedTask.length > 25) {
                  lines = formattedTask.length / 25
                  var temp = formattedTask;
                  for (var i = 0; i < lines; i++) {
                    formattedTask=temp.slice(25*i, 25*i+25)+"\n"
                    dateList+="\n";
                  }
                }
              }

              if (activeUser.tasks[i].complete) {
                formattedTask = '~~' + formattedTask + '~~';
              } else if (activeUser.tasks[i].rem) {
                formattedTask += " 🔔";
              }// assemble task line
              taskList += formattedTask + '\n'; // add task line to list
            }

          }
          if(taskList.length === 0){
            taskList = "You have no tasks!"
            dateList = "and no dates..."
          }
          const embed = new MessageEmbed()
          .setColor("#9B59B6")//purple
          .setTitle("__"+message.author.username+'\'s To-do '+date.toString().slice(0,15)+"__") // add date
          .addFields(
          	{ name: 'Tasks:', value: taskList, inline: true }
          );



          if (activeUser.lastList[1] != ""){
            let thisMessage = await client.channels.cache.get(activeUser.lastList[1]).messages.fetch(activeUser.lastList[2]);
            //console.log(thisMessage);activeUser.lastList[1] != ""
            thisMessage.edit(embed);
          }
        }

        // UPDATE LAST ALL LIST

        console.log(activeUser.lastListAll)


        let taskList = '';
        let dateList = '';
        let formattedTask = ''; // set up task collectors
        var date = new Date();

        for (var i = 0; i < activeUser.tasks.length; i++) {
          var lines = 0; //extra lines
          if(activeUser.tasks[i].date < date) {
            if (activeUser.tasks[i].complete){
              activeUser.tasks[i].remove();
              i--;
            }
            else{
              dateList += activeUser.tasks[i].date.toString().slice(0,10) + "\n";
              formattedTask = i + ". " //number
              formattedTask += activeUser.tasks[i].name+"\n";
              if (activeUser.mobile) { //25 char wrap
                if(formattedTask.length > 25) {
                  lines = formattedTask.length / 25
                  var temp = formattedTask;
                  for (var i = 0; i < lines; i++) {
                    formattedTask=temp.slice(25*i, 25*i+25)+"\n"
                    dateList+="\n";
                  }
                }
              }

              taskList += formattedTask;
            }
          }
          else {

            dateList += activeUser.tasks[i].date.toString().slice(0,10) + "\n";
            formattedTask = i + ". " //number
            formattedTask += activeUser.tasks[i].name;
            if (activeUser.mobile) { //25 char wrap
              if(formattedTask.length > 25) {
                lines = formattedTask.length / 25
                var temp = formattedTask;
                for (var i = 0; i < lines; i++) {
                  formattedTask=temp.slice(25*i, 25*i+25)+"\n"
                  dateList+="\n";
                }
              }
            }

            if (activeUser.tasks[i].complete) {
              formattedTask = '~~' + formattedTask + '~~';
            } else if (activeUser.tasks[i].rem) {
              formattedTask += " 🔔";
            }// assemble task line
            taskList += formattedTask + '\n'; // add task line to list
          }



        }
        if(taskList.length === 0){
          taskList = "You have no tasks!"
          dateList = "and no dates..."
        }

        const embed2 = new MessageEmbed()
        .setColor("#9B59B6")
        .setTitle("__"+message.author.username+'\'s List of All Tasks__') // add date
        .addFields(
          { name: 'Tasks:', value: taskList, inline: true },
          { name: 'Due:', value: dateList, inline: true },
        );


        if (activeUser.lastListAll[1] != ""){
          let thisMessage2 = await client.channels.cache.get(activeUser.lastListAll[1]).messages.fetch(activeUser.lastListAll[2]);

          //console.log(thisMessage2);
          thisMessage2.edit(embed2);
        }
    }
}
