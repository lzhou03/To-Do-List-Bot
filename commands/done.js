module.exports = {
    name: 'done',
    category: 'write',
    description: 'edits todo list message and database status',
    usage: `done`,
    async execute(message, args, command, client, Discord){
        //const msg = await message.channel.send('executing...');


        //add comand to write to DB here



        const embed = new MessageEmbed()
        .setColor(process.env.COLOR)
        .setTitle("You've completed Task "+args[0] + "!");
        .setDescription("Nice Work!");

        message.channel.send(embed);
    }
}
