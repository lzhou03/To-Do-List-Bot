const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'rm',
    category: 'write',
    description: 'removes an item from the to-do list',
    usage: `rm`,
    async execute(message, args, command, client, Discord){
        //check arguments
        if (!args[0]){
          message.channels.send("Please specify the task ID number.")
        }
        else{
          var taskNum = args[0];
        }

        //add comand to write to DB here



        const embed = new MessageEmbed()
        .setColor(process.env.COLOR)
        .setTitle("Removed " + args[0]); //add task name
        //.setDescription(args[0]); //add task name

        message.channel.send(embed);
    }
}
