const waiter = require('./waiter');

let knownActions = [];

const processInit = (client, message) => {
  waiter.registerWaitingUser(message.author);
  message.reply('Que puis je faire pour vous? *(Tapez: "Mode d\'emploi" pour une aide)*');
};

const processCancel = (client, message) => {
  if (waiter.isWaitingUser(message.author)) {
    message.reply('Bien, faites-moi signe si vous avez besoin de moi');
    waiter.removeWaitingUser(message.author);
  }
};

const processCurrentWork = (client, message) => {
  if (waiter.isWaitingUser(message.author)) {
    message.reply(`Je vous sers.${waiter.getWaitingUsers().length === 1 ? '' : `Ainsi que ${waiter.getWaitingUsers().join(',')}`}`);
  }
};

const processForget = (client, message) => {
  if (waiter.isWaitingUser(message.author)) {
    waiter.clearAllUsers();
    message.reply('Bien, faites-moi signe si vous avez besoin de moi');
  }
};

const processHelp = (client, message) => {
  const fields = [];
  if (waiter.isWaitingUser(message.author)) {
    Object.keys(knownActions).forEach((actionKey) => {
      const action = knownActions[actionKey];
      if (action.help) {
        fields.push({
          name: actionKey,
          value: action.help,
        });
      }
    });

    message.reply('Vos désirs sont mes ordres.', {
      embed: {
        fields,
      },
    });
  }
};

knownActions = {
  'jarvis?': {
    business: processInit,
  },
  rien: {
    business: processCancel,
    help: 'Je n\'écouterai plus vos commandes',
  },
  'que fais-tu?': {
    business: processCurrentWork,
    help: 'Je liste les utilisateurs que je sers',
  },
  'oublie les': {
    business: processForget,
    help: 'Je ne sers plus personne',
  },
  "mode d'emploi": {
    business: processHelp,
  },
};

exports.knownActions = knownActions;
