const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');

module.exports = {
    name: 'update',
    category: 'edit',
    description: 'updates printed to-do list',
    usage: `update`,
    async execute(message, args, command, client, Discord, db){
        //check arguments
        var userid = message.author.id;
        const activeUser = await userSchema.findOne({ uid: userid }); // find user
        if (!activeUser) {
          return;
        }
        let taskList = '';
        let formattedTask = ''; // set up task collectors
        var date = activeUser.lastDate;
        const reformattedDate = date.toString().slice(0,15);
        for (var i = 0; i < activeUser.tasks.length; i++) {
          console.log(activeUser.tasks[i].date);
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
        .setTitle('__To-do '+date.toString().slice(0,15)+"__") // add date
        .setDescription(taskList);

        message.edit(embed);

    }
}
