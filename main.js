require("dotenv").config();
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const mongoose = require('mongoose');
const { prefix } = require('./config.json');
//const guildSchema = require('./models/guildSchema.js')



client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for(const file of commandFiles){
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}



client.once('ready', () => {
	console.log('Ready!');
  client.channels.cache.get("888802387983212554").send("ready");
	client.user.setActivity(`over you 24/7 O_O`, {type: 'WATCHING'});
});



//what the bot does whenever a message is sent

client.on('message', message => {
	//if the author is the bot, ignore the message
	if(message.author.id === client.user.id) return;

	//if the message starts with the prefix, execute this.
	if(message.content.startsWith(`${prefix}`)){
		//separate commands and arguments
		const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();

		if(command === 'hello' || command === 'Hello'){
			message.channel.send('Hi there!');
		}
		else if(command === 'add'){
			//message.channel.send("abcd");
			client.commands.get("add").execute(message, args, command, client, Discord, db);
		}
		else if(command === 'rm'){
			//message.channel.send("abcd");
			client.commands.get("rm").execute(message, args, command, client, Discord, db);
		}
		else if(command === 'list'){
			//message.channel.send("abcd");
			client.commands.get("list").execute(message, args, command, client, Discord, db);
		}
		else if(command === 'done'){
			//message.channel.send("abcd");
			client.commands.get("done").execute(message, args, command, client, Discord, db);
		}
		else if(command === 'update'){
			//message.channel.send("abcd");
			client.commands.get("update").execute(message, args, command, client, Discord, db);
		}




	}


})



client.on("guildCreate", guild => {
    console.log("Joined a new guild: " + guild.name);

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

var db = mongoose.connection;

client.login(process.env.BOT_TOKEN);
