const Discord = require('discord.js');

const client = new Discord.Client();

const waiterCommand = require('./commands/waiter.js');

const config = require('./config.json');

client.on('ready', () => {
  client.user.setGame('Assistant Discord');
});

client.on('message', (message) => {
  if (message.author.bot) return;
  try {
    waiterCommand.process(client, message);
  } catch (err) {
    console.error(err);
  }
});

client.login(config.token);
