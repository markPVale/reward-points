const { users } = require('../pointsModels/database');
const util = require('util');

exports.spendUserPointsServices = (payload) => {
  let {userId, pointsSpent} = payload;
  let currentSpendingTransactions = []

  while (pointsSpent > 0) {
    for (let i = 0; i < users.length; i++) {
      if (users[i].userId === userId) {
        let user = users[i];
        if (pointsSpent > user.totalPoints) {
          console.error('Error: Not Enough Points in User Account To Spend The Requested Amount')
          break;
        } else {
          for (let i = 0; i < user.transactions.length; i++) {
            let currentTransactionPoints = user.transactions[i].points

            if (currentTransactionPoints < pointsSpent) {
              let currentTransactionPayer = user.transactions[i].payer.toUpperCase()
              let currentPayerBalance = user.payerBalances.get(currentTransactionPayer)
              let adjustedPayerBalance = currentPayerBalance - user.transactions[i].points
              pointsSpent -= user.transactions[i].points
              user.totalPoints -= user.transactions[i].points
              currentSpendingTransactions.push({"payer": currentTransactionPayer, "points": -(user.transactions[i].points)})
              user.payerBalances.set(currentTransactionPayer, adjustedPayerBalance)
              if(user.transactions[i].pointsRedeemed === undefined) {
                user.transactions[i].pointsRedeemed = 0
              }
              user.transactions[i].pointsRedeemed -= user.transactions[i].points;
              user.transactions[i].pointsRedeemedTimestamp = new Date()
              user.transactions[i].points = 0;
              user.redeemedPointTransactions.unshift(user.transactions[i])
              user.transactions.shift();
            } else {
              let currentTransactionPayer = user.transactions[i].payer;
              let currentPayerBalance = user.payerBalances.get(currentTransactionPayer);
              let adjustedPayerBalance = currentPayerBalance - pointsSpent;
              currentSpendingTransactions.push({"payer": currentTransactionPayer, "points": -(pointsSpent)})
              currentTransactionPoints -= pointsSpent
              if(user.transactions[i].partialPointsRedeemed === undefined) {
                user.transactions[i].partialPointsRedeemed = 0
              }
              user.transactions[i].partialPointsRedeemed -= pointsSpent
              user.transactions[i].points -= pointsSpent
              user.transactions[i].partialPointsRedeemedTimestamp = new Date()
              user.totalPoints -= pointsSpent
              user.payerBalances.set(currentTransactionPayer, adjustedPayerBalance)
              if (user.transactions[i].points === 0) {
                user.redeemedPointTransactions.unshift(user.transactions[i]);
                user.transactions.shift();
              }
              pointsSpent = 0;
              console.log('Points Redeemed: ', currentSpendingTransactions)
              let spentPoints = JSON.stringify(currentSpendingTransactions)
              return spentPoints;
              break;
            }
          }
        }
      }
    }
  }
}