const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'rm',
    category: 'write',
    description: 'removes and item from the to-do list',
    usage: `rm`,
    async execute(message, args, command, client, Discord){
        //const msg = await message.channel.send('executing...');


        //add comand to write to DB here



        const embed = new MessageEmbed()
        .setColor(process.env.COLOR)
        .setTitle("Removed " + args[0]); //add task name
        //.setDescription(args[0]); //add task name

        message.channel.send(embed);
    }
}
