const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'add',
    category: 'write',
    description: 'adds an item to the to-do list',
    usage: `add`,
    async execute(message, args, command, client, Discord){
        //separate parameters


        //add comand to write to DB here



        const embed = new MessageEmbed()
        .setColor(process.env.COLOR)
        .setTitle('Added' + args[0]); //add task name: read from DB
        //.setDescription(args[0]);

        message.channel.send(embed);
    }
}
