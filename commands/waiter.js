const actions = require('./waiter_actions');

const waitingUsers = [];

const isWaitingUser = author => waitingUsers.indexOf(author) > -1;

const removeWaitingUser = (author) => {
  waitingUsers.splice(waitingUsers.indexOf(author), 1);
};

const registerWaitingUser = (author) => {
  removeWaitingUser(author);
  waitingUsers.push(author);
};

const clearAllUsers = () => {
  waitingUsers.splice(0, waitingUsers.length);
};

exports.process = (client, message) => {
  const messageContent = message.content.toLowerCase();
  if (actions.knownActions[messageContent]) {
    actions.knownActions[messageContent].business(client, message);
  }
};

exports.getWaitingUsers = () => waitingUsers;
exports.isWaitingUser = isWaitingUser;
exports.registerWaitingUser = registerWaitingUser;
exports.clearAllUsers = clearAllUsers;
exports.removeWaitingUser = removeWaitingUser;
