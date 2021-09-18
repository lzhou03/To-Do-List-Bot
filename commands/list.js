const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'list',
    category: 'read',
    description: 'reads and prints the to-do list',
    usage: `list`,
    async execute(message, args, command, client, Discord){
        //const msg = await message.channel.send('executing...');


        //add comand to read from DB here

        

        const embed = new MessageEmbed()
        .setColor(process.env.COLOR)
        .setTitle('List: ') // add date
        .setDescription(args[0]);

        message.channel.send(embed);
    }
}
