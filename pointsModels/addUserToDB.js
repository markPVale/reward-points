const { users } = require('./database');
const util = require('util');

exports.addUserToDB = (newUser) => {
  users.unshift(newUser)
};
