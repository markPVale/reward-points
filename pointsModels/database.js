const users = []
const userCheck = new Set();
let userId = 0;

class User {
  constructor(userId, totalPoints, payerBalances) {
    this.userId = userId;
    this.totalPoints = totalPoints;
    this.payerBalances = new Map();
    this.transactions = [];
    this.redeemedPointTransactions = [];
  }
}

module.exports = { users, User, userCheck }