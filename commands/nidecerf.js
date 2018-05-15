const answers = require('./nidecerf_answers');

let rate = 10;
let mute = false;

const setRate = (message, newRate) => {
  rate = newRate;
  message.reply(`Je donnerai mon avis sur ${rate}% des messages`);
};

const printUsage = (message) => {
  const fields = [];
  answers.knownCommands.forEach((action) => {
    fields.push({
      name: action.command,
      value: action.info,
    });
  });

  message.reply('', {
    embed: {
      fields,
    },
  });
};

const muteBot = (message) => {
  mute = true;
  message.reply("Ok, je me tais. De toute facon personne ne m'écoute", {
    embed: {
      fields: [
        {
          name: '/nd unmute',
          value: 'Réactive les réponses',
        },
      ],
    },
  });
};

const processAdminCommand = (client, message) => {
  const commands = message.content.split(' ');
  if (commands.length > 1) {
    if (commands[0] === '/nd') {
      if (commands[1].toLowerCase() === 'rate') {
        if (commands.length === 3) {
          setRate(message, Number(commands[2]));
          return;
        }
      } else if (commands[1].toLowerCase() === 'help') {
        printUsage(message);
        return;
      } else if (commands[1].toLowerCase() === 'unmute') {
        mute = false;
        setRate(message, 10);
        return;
      }
    }
  }
  message.reply("Je n'ai pas compris cette demande...");
  printUsage(message);
};

const sometimesReplyMessage = (message, possibleAnswers, overrideRate) => {
  const random = Math.floor(Math.random() * 100);
  if (random < (overrideRate || rate)) {
    const index = Math.floor(Math.random() * possibleAnswers.length);
    message.reply(possibleAnswers[index]);
  }
};

// Main method
exports.process = (client, message) => {
  if (message.content.toLowerCase().startsWith('/nd')) {
    processAdminCommand(client, message);
  } else if (!mute) {
    if (
      message.content.toLowerCase().indexOf('ta gueule nico') > -1 ||
      message.content.toLowerCase().indexOf('nico ta gueule') > -1
    ) {
      muteBot(message);
    } else if (message.content.toLowerCase().startsWith('/nd')) {
      processAdminCommand(client, message);
    } else if (message.content.toLowerCase().indexOf('xperthis') > -1) {
      sometimesReplyMessage(message, answers.xperthisAnswers, 100);
    } else if (
      message.content.toLowerCase().indexOf('cedric') > -1 ||
      message.content.toLowerCase().indexOf('cédric') > -1
    ) {
      sometimesReplyMessage(message, answers.cedricAnswers, 100);
    } else if(message.content.toLowerCase().indexOf('hein nico ?') > -1) {
      sometimesReplyMessage(message, ['Oui maitre !'], 100);
    } else {
      sometimesReplyMessage(message, answers.randomAnswers);
    }
  }
};
