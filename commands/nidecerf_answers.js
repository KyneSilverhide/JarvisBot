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

exports.knownCommands = knownCommands;
exports.cedricAnswers = cedricAnswers;
exports.xperthisAnswers = xperthisAnswers;
exports.randomAnswers = randomAnswers;
