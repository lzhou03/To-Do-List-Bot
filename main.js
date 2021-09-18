require("dotenv").config();
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const mongoose = require('mongoose');

client.once('ready', () => {
	console.log('Ready!');
  client.channels.cache.get("888790836094066732").send("ready");
});

client.login(process.env.BOT_TOKEN);
