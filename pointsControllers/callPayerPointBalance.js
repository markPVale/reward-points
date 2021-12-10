const usersTransactions = require('../pointsModels/database');
const { callPayerPointBalanceInDB } = require('../pointsModels/callPayerPointBalanceInDB');
let {users} = usersTransactions;
let {userCheck} = usersTransactions;

exports.callPayerPointBalance = ((req, res) => {
  if (users.length === 0) {
    res.sendStatus(404)
  } else {
    for (let user of usersTransactions.users) {
      if (userCheck.has(user.userId) === false) {
        console.log('User Not Found')
        res.sendStatus(404);
      } else if (user.userId === req.body.userId) {
        callPayerPointBalanceInDB(req.body.userId)
        res.status(200).send(callPayerPointBalanceInDB(req.body.userId));
      }
    }
  }
});