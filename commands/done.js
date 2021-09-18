const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'done',
    category: 'write',
    description: 'edits todo list message and database status',
    usage: `done`,
    async execute(message, args, command, client, Discord){
      //check arguments
      if (!args[0]){
        message.channels.send("Please specify the task ID number.")
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
