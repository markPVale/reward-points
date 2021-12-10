const { users } = require('./database');
const util = require('util');

exports.callPayerPointBalanceInDB = (userData) => {
  if (users.length === 0) {
    console.log('There Are No Users In The DB')
  } else {
    for (let user of users) {
      if (user.userId !== userData) {
        console.log('The User Data Does Not Exist')
      } else {
        console.log('payerBalances', user.payerBalances)
        let payerBalancesMap = Object.fromEntries(user.payerBalances);
        return payerBalancesMap;
      }
    }
  }
};