const usersTransactions = require('../pointsModels/database');
const { addTransactionService } = require('../pointsServices/addTransactionService');

exports.addTransaction = ((req, res) => {
  let {users} = usersTransactions;
    let userId = req.body.userId;
    let payer = req.body.payer.toUpperCase();
    let points = req.body.points;
    let transactionData = {userId, payer, points}
    if (userId !== undefined && payer !==
      undefined && points !== undefined && points > 0) {
      addTransactionService(transactionData, new Date())
      res.sendStatus(201)
    } else {
      console.log('Error In Transaction Data');
      res.sendStatus(400);
    }
  });

