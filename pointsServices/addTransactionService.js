const { users, userCheck, User, userId } = require('../pointsModels/database');
const { sortByTimestamp } = require('./sortByTimestamp');
const { addUserToDB } = require('../pointsModels/addUserToDB');

exports.addTransactionService = (transactionData, timestamp) => {
  transactionData.timestamp = timestamp;
  const { userId, payer, points } = transactionData;

  if (users.length === 0) { //if new user, can't add negative points
    if (points < 0) {
      console.log('Error: User Cannot Be Initiated With A Negative Point Balance');
    } else {
      addUserToDB(new User(userId, points, payer));
      userCheck.add(userId);
      users[0].transactions.push(transactionData);
      users[0].payerBalances.set(payer, points);
    }
  } else if (!userCheck.has(userId)) {
    if (points < 0) {
      console.log('Error: User Cannot Be Initiated With A Negative Point Balance');
    } else {
      addUserToDB(new User(userId, points, payer));
      userCheck.add(userId);
      users[0].transactions.push(transactionData);
      users[0].payerBalances.set(payer, points);
    }
  } else {
    for (const user of users) {
      if (user.userId === transactionData.userId) {
        if (user.totalPoints + points >= 0) {
          user.totalPoints += points;
          if (points >= 0) {
          user.transactions.push(transactionData);
          sortByTimestamp(user.transactions);
          } else {
            user.negativePointTransactions.push(transactionData);
          sortByTimestamp(user.negativePointTransactions);
            for (let transaction of user.transactions) {
              if (transaction.payer === payer) {
                if (transaction.points += points > 0) {
                  transaction.points += points;
                  if (transaction.pointsReturned === undefined) {
                    transaction.pointsReturned = points;
                  } else {
                    transaction.pointsReturned += points;
                  }
                } else {
                  if (transaction.pointsReturned === undefined) {
                    transaction.pointsReturned = points;
                  } else {
                    transaction.pointsReturned += points;
                  }
                  user.negativePointTransactions.push(transactionData);
                  sortByTimestamp(user.negativePointTransactions);
                  user.transactions.splice(user.transactions.indexOf(transaction, 1));
                }
              }
            }
          }
          if (user.payerBalances.has(transactionData.payer)) {
            const currentBalance = user.payerBalances.get(payer);
            if (currentBalance + points >= 0) {
              const updateBalance = user.payerBalances.get(payer) + points;
              user.payerBalances.set(payer, updateBalance);
            } else {
              user.payerBalances.set(payer, 0);
            }
          } else if (points > 0) {
            user.payerBalances.set(payer, points);
          } else {
            console.log('Error: Attempt To Update Negative Points From A Zero Balance');
            break;
          }
        } else {
          console.log('Invalid number of points');
          break;
        }
      }
    }
  }
};




