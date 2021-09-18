require("dotenv").config();
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const mongoose = require('mongoose');
const { prefix } = require('./config.json');



client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for(const file of commandFiles){
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}



client.once('ready', () => {
	console.log('Ready!');
  client.channels.cache.get("888802387983212554").send("a");
});



//what the bot does whenever a message is sent

client.on('message', message => {
	//if the author is the bot, ignor the message
	if(message.author.id === client.user.id) return;

	//if the message starts with the prefix, execute this.
	if(message.content.startsWith(`${prefix}`)){
		//separate commands and arguments
		const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();

		if(command === 'ping'){
			message.channel.send('pong!');
		}




	}


})




mongoose.connect(process.env.MONGODB_SRV, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //userFindAndModify: false,
}).then(()=>{
  console.log("Connected to DB");
}).catch((err) => {
  console.log(err);
});
client.login(process.env.BOT_TOKEN);
