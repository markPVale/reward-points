const { users } = require('./database');

exports.addUserToDB = (newUser) => {
  users.unshift(newUser);
};
