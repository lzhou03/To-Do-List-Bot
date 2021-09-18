const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
const User = require('../models/userSchema.js');
const task = require('../models/taskSchema.js');
const userSchema = require('../models/userSchema.js');

module.exports = {
    name: 'add',
    category: 'write',
    description: 'adds an item to the to-do list',
    usage: `add`,
    async execute(message, args, command, client, Discord, db){

        var userid = message.author.id;
        //message.channel.send(uid);

//if user doesn't exist, add new user
        var count = await User.countDocuments({uid: userid})
          console.log(userid);
          console.log(count);
          if(count===0){

            const newUser = new User({uid: userid, optIn: false, lastDate: "09/28/2003"});

            newUser.save();
            console.log('added user '+userid);
          }
          else{



//separate parameters
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

          var thisUser = await userSchema.findOne({ uid : userid });
          console.log(thisUser);

          const newTask = new task({name: taskName, date: date, complete: false, id: thisUser.tasks.length})
          thisUser.tasks.push(newTask);
          await thisUser.save();

          //task.create({name: taskName, date: date, complete: false, id: User.countDocuments()});

          //let doc = await users.findOneAndUpdate({uid: userid}, {tasks: taskName});




          // lists all databases, client parameter may need adjustment
          async function listDatabases(client) {
              const databasesList = await client.db.admin().listDatabases()

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
}
