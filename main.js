require("dotenv").config();
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const mongoose = require('mongoose');
const { prefix } = require('./config.json');
const userSchema = require('./models/userSchema.js');
const { MessageEmbed } = require('discord.js');
const keep_alive = require('./keep_alive.js');


client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.once('ready', () => {
  console.log('Ready!');
  //client.channels.cache.get("888802387983212554").send("ready");
  client.user.setActivity(`over u`, { type: 'WATCHING' });
});

//what the bot does whenever a message is sent
client.on('message', message => {
  //if the author is the bot, ignore the message
  if (message.author.id === client.user.id) return;

  //if the message starts with the prefix, execute this.
  if (message.content.toLowerCase().startsWith(`${prefix}`)){
  //separate commands and arguments
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();

  if (command === 'hello' || command === 'Hello') {
    message.channel.send('Hi there!');
  }
  else if (command === 'add') {
    //message.channel.send("abcd");
    client.commands.get("add").execute(message, args, command, client, Discord, db)

  }
  else if (command === 'rm' || command == 'remove') {
    //message.channel.send("abcd");
    client.commands.get("rm").execute(message, args, command, client, Discord, db);
  }
  else if (command === 'list') {
    //message.channel.send("abcd");
    client.commands.get("list").execute(message, args, command, client, Discord, db);
  }
  else if (command === 'done') {
    //message.channel.send("abcd");
    client.commands.get("done").execute(message, args, command, client, Discord, db);

  }
  else if (command === 'edit') {
    //message.channel.send("abcd");
    client.commands.get("edit").execute(message, args, command, client, Discord, db);

  }
  else if (command === 'clear') {
    //message.channel.send("abcd");
    client.commands.get("clear").execute(message, args, command, client, Discord, db);

  }
  else if (command === 'ree') {
    //message.channel.send("abcd");
    client.commands.get("ree").execute(message, args, command, client, Discord, db);

  }
  else if (command === 'date') {
    //message.channel.send("abcd");
    client.commands.get("date").execute(message, args, command, client, Discord, db);

  }
  else if (command === 'mobile') {
    //message.channel.send("abcd");
    client.commands.get("mobile").execute(message, args, command, client, Discord, db);

  }
  else {
    const embed = new MessageEmbed()
      .setColor("RED")
      .setTitle("Invalid Command!")
      .setDescription(command);

    message.channel.send(embed);
  }
}

}
})

mongoose.connect(process.env.MONGODB_SRV, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //userFindAndModify: false,
}).then(() => {
  console.log("Connected to DB");
}).catch((err) => {
  console.log(err);
});

var db = mongoose.connection;

client.login(process.env.BOT_TOKEN);
