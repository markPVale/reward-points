const { users, userCheck } = require('./database');
const util = require('util');

exports.callPayerPointBalanceInDB = (userData) => {

  if (users.length === 0) {
    console.log('There Are No Users In The DB')
  }
  if (userCheck.has(userData)) {
    for (let user of users) {
      if (user.userId === userData) {
        let payerBalancesMap = Object.fromEntries(user.payerBalances);
        return payerBalancesMap;
      } else {
        // do nothing
      }
    }
  } else {
    console.log('User Not Found In DataBase');
  }
};

