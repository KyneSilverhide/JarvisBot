const randomAnswers = [
  'Merci',
  "Il y aura bientôt un nouvel organigramme, je ne sais pas ce qu'on me réserve...",
  "Tu as l'âme d'un B1 Rebel",
];

const xperthisAnswers = [
  "Ce n'est pas une matrice, c'est plutôt un tableau à deux dimensions",
  'Allez courage, plus que 10 ans a stabiliser EPR',
  "Dans mon coeur tu as toujours été plus haut dans l'organigramme",
];

const cedricAnswers = [
  "Tu penses qu'on devrait demander l'avis de Cédric?",
  "Rien que d'entendre ce nom, je suis tout emoustillé",
  'Je trouve que Cédric nous a quand même bien aidé !',
];

const knownCommands = [
  {
    command: '/nd help',
    info: 'Affiche la liste des commandes',
  },
  {
    command: '/nd rate [valeur]',
    info: 'Définit le taux de réponse en %',
  },
  {
    command: '/nd unmute',
    info: 'Reactive le bot',
  },
];

let rate = 10;
let mute = false;

const setRate = (message, newRate) => {
  rate = newRate;
  message.reply(`Je donnerai mon avis sur ${rate}% des messages`);
};

const printUsage = (message) => {
  const fields = [];
  knownCommands.forEach((action) => {
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
  console.log('Admin command ', message.content);
  const commands = message.content.split(' ');
  console.log(commands);
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

const sometimesReplyMessage = (message, answers, overrideRate) => {
  const random = Math.floor(Math.random() * 100);
  if (random < (overrideRate || rate)) {
    const index = Math.floor(Math.random() * answers.length);
    message.reply(answers[index]);
  }
};

// Main method
exports.process = (client, message) => {
<<<<<<< HEAD
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
      sometimesReplyMessage(message, xperthisAnswers, 100);
    } else if (
      message.content.toLowerCase().indexOf('cedric') > -1 ||
      message.content.toLowerCase().indexOf('cédric') > -1
    ) {
      sometimesReplyMessage(message, cedricAnswers, 100);
    } else {
      sometimesReplyMessage(message, randomAnswers);
=======
  if (message.content.toLowerCase().indexOf('ta gueule nico') > -1 || message.content.toLowerCase().indexOf('nico ta gueule') > -1) {
    message.reply("Ok, je parlerai moins... de toute façon plus personne ne m'écoute");
    rate /= 2;
    console.log(`Rate is now ${rate}`);
  } else if (message.content.toLowerCase().startsWith('/nidecerf')) {
    processAdminCommand(client, message);
  } else {
    const random = Math.floor(Math.random() * 100);
    if (random <= rate) {
      const index = Math.floor(Math.random() * randomAnswers.length);
      message.reply(randomAnswers[index]);
>>>>>>> 804180f02c3a5809615669f725ad6c5977eb828f
    }
  }
};
