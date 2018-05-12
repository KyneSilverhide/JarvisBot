const Discord = require('discord.js');

const client = new Discord.Client();

const waiterCommand = require('./commands/waiter.js');
const nidecerfCommand = require('./commands/nidecerf.js');

const config = require('./config.json');

let mode = 'Jarvis';
client.on('ready', () => {
  console.log('Jarvis started');
  client.user.setActivity('Assistant Discord');
});

const switchToNidecerf = (message) => {
  mode = 'Nidecerf';
  client.user.setActivity("Chuter dans l'organigramme");
  client.user.setUsername('Nicolas Decerf');
  message.reply('je suis prêt à sauver EPR');
};

const switchToJarvis = (message) => {
  mode = 'Jarvis';
  client.user.setActivity('Assistant Discord');
  client.user.setUsername('Jarvis');
  message.reply('je suis à vos ordres');
};

const processMessage = (message) => {
  try {
    if (mode === 'Jarvis') {
      waiterCommand.process(client, message);
    } else if (mode === 'Nidecerf') {
      nidecerfCommand.process(client, message);
    }
  } catch (err) {
    console.error(err);
  }
};

client.on('message', (message) => {
  if (message.author.bot) return;
  if (message.content.toLowerCase() === '/nidecerf') {
    switchToNidecerf(message);
  } else if (message.content.toLowerCase() === '/jarvis') {
    switchToJarvis(message);
  } else {
    processMessage(message);
  }
});

client.login(config.token);
