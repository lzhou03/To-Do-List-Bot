const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
const userSchema = require('../models/userSchema.js');

module.exports = {
    name: 'add',
    category: 'write',
    description: 'adds an item to the to-do list',
    usage: `add`,
    async execute(message, args, command, client, Discord, db){
        //separate parameters
        var uid = message.author.id;
        const activeUser = await db.todos.users.find({ uid: uid });
        if(activeUser){
          const newUser = new user({id: message.author.id, optIn: false, lastDate: "09/28/2003"});

          todos.users.push(newUser);
          todos.save();
        }


        var index = 1;
        var date = new Date(args[0]);

        if(isNaN(date)){
          index = 0;
          //date = lastDate;
        }

        var taskName = "";
        while(args[index]){
          taskName += " " + args[index];
          index++;
        }

        //add comand to write to DB here
        // lists all databases, client parameter may need adjustment
        async function listDatabases(client) {
            const databasesList = await client.db().admin().listDatabases()

            console.log("Databases:");
            databasesList.databases.forEach( db => {
            console.log(`- ${db.name}`)
           })
        }
        listDatabases(client)
        // lists all databases, client parameter may need adjustment




        const embed = new MessageEmbed()
        .setColor("GREEN")
        .setTitle('Added Task: \"' + taskName + "\" to " + date.toString().slice(0,15)); //add task name: read from DB
        //.setDescription(args[0]);

        message.channel.send(embed);
    }
}
