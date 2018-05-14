const randomAnswers = [
  "Ce n'est pas une matrice, c'est plutôt un tableau à deux dimensions",
  'Allez courage, plus que 35.412 bugs bloquants',
  "Tu penses qu'on devrait demander à Cédric?",
  'Merci',
  "Il y aura bientôt un nouvel organigramme, je ne sais pas ce qu'on me réserve...",
  "Tu as l'âme d'un B1 Rebel",
  "Dans mon coeur tu as toujours été plus haut dans l'organigramme",
];

let rate = 10;

const processAdminCommand = (client, message) => {
  const commands = message.content.split(' ');
  if (commands.length > 1) {
    if (commands.length === 3 && commands[1].toLowerCase === 'rate') {
      rate = Number(commands[2]);
      message.reply(`Je donnerai mon avis sur ${rate}% des messages`);
      console.log(`Rate is now ${rate}`);
    }
  }
};

exports.process = (client, message) => {
  if (message.content.toLowerCase().indexOf('ta gueule nico') > -1) {
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
    }
  }
};
