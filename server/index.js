const express = require('express');
const pointsTransactionRoute = require('./pointTransactionRoutes');
const app = express();
const port = 3000;
const db = require('../pointsModels/database');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.text());

app.use('/', pointsTransactionRoute);
app.use('/spendPoints', pointsTransactionRoute);
app.use('/user', pointsTransactionRoute);

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
