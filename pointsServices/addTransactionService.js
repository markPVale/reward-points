const { users, userCheck, User, userId } = require('../pointsModels/database')
const {sortByTimestamp} = require('./sortByTimestamp');
const {addUserToDB} = require('../pointsModels/addUserToDB');
const util = require('util');

exports.addTransactionService = (transactionData, timestamp) => {
  transactionData.timestamp = timestamp;
  let { userId, payer, points } = transactionData;

  if (users.length === 0) {
    addUserToDB(new User(userId, points, payer));
    userCheck.add(userId)
    users[0].transactions.push(transactionData);
    users[0].payerBalances.set(payer, points)
    // console.log('added 0 length', 'userId: ', userId, "**", util.inspect(users, false, null, true));
  } else if (!userCheck.has(userId)) {
    addUserToDB(new User(userId, points, payer))
    userCheck.add(userId)
    users[0].transactions.push(transactionData);
    users[0].payerBalances.set(payer, points)
    // console.log('added non 0 length', 'userId: ', userId, "**", util.inspect(users, false, null, true));
  } else {
    for (let user of users) {
      if (user.userId === transactionData.userId) {
        if(user.totalPoints + points >= 0) {
          user.totalPoints += points
          user.transactions.push(transactionData);
          sortByTimestamp(user.transactions)
          if (user.payerBalances.has(transactionData.payer)) {
            let currentBalance = user.payerBalances.get(payer)
            if (currentBalance + points >= 0) {
              let updateBalance = user.payerBalances.get(payer) + points;
              user.payerBalances.set(payer, updateBalance);
              // console.log('added already in update payer', util.inspect(users, false, null, true));
            }
          } else if (points > 0) {
            user.payerBalances.set(payer, points)
            // console.log('added already in new payer', util.inspect(users, false, null, true));
          } else {
            console.log('Error: Attempt To Update Negative Points From A Zero Balance')
          }
          break
        } else {
          console.log('Invalid number of points')
          break
        }
      }
    }
  }
}
