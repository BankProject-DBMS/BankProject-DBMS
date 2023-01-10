module.exports = (app) => {
  const transactions = require('../controllers/transaction.controller');
  const { jwtauth } = require('../middleware/jwt');

  const router = require('express').Router();

  router.get('/find/:from/:to', transactions.findFromTo);

  router.get('/debit/:id', transactions.getAllOutgoing);

  router.get('/credit/:id', transactions.getAllIncoming);

  router.post('/create', [jwtauth], transactions.create);

  app.use('/transactions', router);
};
