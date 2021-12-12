const usersTransactions = require('../pointsModels/database');
const { callPayerPointBalanceInDB } = require('../pointsModels/callPayerPointBalanceInDB');
let {users} = usersTransactions;
let {userCheck} = usersTransactions;

exports.callPayerPointBalance = ((req, res) => {
  if (users.length === 0) {
    res.sendStatus(404);
  } else if (userCheck.has(req.body.userId)) {
    for (let user of usersTransactions.users) {
      if (user.userId === req.body.userId) {
        let data = callPayerPointBalanceInDB(req.body.userId)
          res.status(200).send(data);
      } else {
        // do nothing
      }
    }
  } else {
    console.log('User Not Found')
    res.sendStatus(404);
  }

});
