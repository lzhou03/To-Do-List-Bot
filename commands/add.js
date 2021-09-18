const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'add',
    category: 'write',
    description: 'adds an item to the to-do list',
    usage: `add`,
    async execute(message, args, command, client, Discord){
        //const msg = await message.channel.send('executing...');


        //add comand to write to DB here



        const embed = new MessageEmbed()
        .setColor(process.env.COLOR)
        .setTitle('Added')
        .setDescription(args[0]);

        message.channel.send(embed);
    }
}
