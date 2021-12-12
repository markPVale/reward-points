const usersTransactions = require('../pointsModels/database')
const { addTransactionService } = require('../pointsServices/addTransactionService')

exports.addTransaction = (req, res) => {
  const { users, userCheck } = usersTransactions;
  const userId = req.body.userId;
  const payer = req.body.payer.toUpperCase();
  const points = req.body.points;
  const transactionData = { userId, payer, points };



  if (userId !== undefined && payer !==
      undefined && points !== undefined) {
        if (userCheck.has(userId) === false && points < 0) {
          console.log('Error: New User Cannot Be Created With Negative Amount Of Points');
          res.sendStatus(400);
        } else {
          addTransactionService(transactionData, new Date());
          res.sendStatus(201);
        }
  } else {
    console.log('Error In Transaction Data');
    res.sendStatus(400);
  }
};
