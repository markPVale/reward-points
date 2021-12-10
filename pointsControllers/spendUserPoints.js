const usersTransactions = require('../pointsModels/database');
const { spendUserPointsServices } = require('../pointsServices/spendUserPointsServices');
let {users} = usersTransactions;
let {userCheck} = usersTransactions;

exports.spendUserPoints = ((req, res) => {
  if (users.length === 0) {
    console.log('Error: User Not Found');
    res.sendStatus(404);
  } else if (userCheck.has(req.body.userId) === false){
    console.log('Error User Not Found')
    res.sendStatus(404)
  } else {
    console.log('spendUserPointsRez', req.body)
    for (let user of users) {
      if (user.userId === req.body.userId && user.totalPoints >= req.body.pointsSpent) {
        // spendUserPointsServices(req.body);
        res.status(200).send((spendUserPointsServices(req.body)))
      } else {
        console.log('Points Exceed Balance');
        res.sendStatus(400);
      }
    }
  }
});