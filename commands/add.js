const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'add',
    category: 'write',
    description: 'adds an item to the to-do list',
    usage: `add`,
    run: async (client, message, args) => {
        const msg = await message.channel.send('🏓 Pinging...');

        const embed = new MessageEmbed()
        .setColor(process.env.COLOR)
        .setTitle('Added')
        .setDescription(args[0]);

        message.channel.send(embed);
    }
}
