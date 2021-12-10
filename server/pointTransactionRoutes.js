const express = require('express');
const router = express.Router();
const db = require('../pointsModels/database');
const {validateUser} = require('../pointsControllers/validateUser');
const {addTransaction} = require('../pointsControllers/addTransaction');
const {spendUserPoints} = require('../pointsControllers/spendUserPoints');
const {callPayerPointBalance} = require('../pointsControllers/callPayerPointBalance');

router.route('/')
  .get((req, res) => {
    res.send('welcome to fetch rewards')
  });

router.route('/user/:id')
  .post((addTransaction))

router.route('/spendPoints', spendUserPoints)
  .put((spendUserPoints))

router.route('/userPoints')
  .get((callPayerPointBalance))


  module.exports = router
