const users = [];
const userCheck = new Set();
const userId = 0;

class User {
  constructor (userId, totalPoints, payerBalances) {
    this.userId = userId;
    this.totalPoints = totalPoints;
    this.payerBalances = new Map();
    this.transactions = [];
    this.redeemedPointTransactions = [];
    this.negativePointTransactions = [];
  }
};

module.exports = { users, User, userCheck };
