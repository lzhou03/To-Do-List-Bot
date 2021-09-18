const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'list',
    category: 'read',
    description: 'reads and prints the to-do list',
    usage: `list`,
    async execute(message, args, command, client, Discord){
        //check args
        if(!args[0]){
          //list todays list
          const embed = new MessageEmbed()
          .setColor(process.env.COLOR)
          .setTitle('List: '+args[0]) // add date
          .setDescription(args[0]);

          message.channel.send(embed);


        }
        else if(args[0]==='all'){
          //list all

          const embed = new MessageEmbed()
          .setColor("#9B59B6")
          .setTitle('List of All Tasks ') // add date
          .setDescription(args[0]);

          message.channel.send(embed);



        }
        else{
          var date = new Date(args[0]);
          if (isNaN(date)){
            const embed = new MessageEmbed()
            .setColor("#E74C3C")//dark red
            .setTitle('Invalid Date!')
            .setDescription(args[0]);

            message.channel.send(embed);
          }
          else{
            const embed = new MessageEmbed()
            .setColor("#9B59B6")//purple
            .setTitle('__To-do '+date.toString().slice(0,15)+"__") // add date
            .setDescription("~~strikethrough test~~");

            message.channel.send(embed);
          }

        }




        //add comand to read from DB here




    }
}
