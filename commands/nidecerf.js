const randomAnswers = [
  "Ce n'est pas une matrice, c'est plutôt un tableau à deux dimensions",
  'Allez courage, plus que 35.412 bugs bloquants',
  "Tu penses qu'on devrait demander à Cédric?",
  'Merci',
  "Il y aura bientôt un nouvel organigramme, je ne sais pas ce qu'on me réserve...",
  "Tu as l'âme d'un B1 Rebel",
];

exports.process = (client, message) => {
  const random = Math.floor(Math.random() * 100);
  console.log(random);
  if (random < 5) {
    const index = Math.floor(Math.random() * randomAnswers.length);
    message.reply(randomAnswers[index]);
  }
};
