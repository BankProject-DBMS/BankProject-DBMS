module.exports = (app) => {
  const transactions = require('../controllers/transaction.controller');
  const { jwtauth } = require('../middleware/jwt');
  const { isEmployee, isManager } = require('../middleware/middleware');

  const router = require('express').Router();

  router.get('/find/:from/:to', transactions.findFromTo);

  router.get('/debit/:id', transactions.getAllOutgoing);

  router.get('/credit/:id', transactions.getAllIncoming);

  router.post('/create', [jwtauth], transactions.create);

  router.get(
    '/report/in',
    [jwtauth, isManager],
    transactions.getBranchInReport
  );

  router.get(
    '/report/in/count',
    [jwtauth, isManager],
    transactions.getBranchInCount
  );

  router.get(
    '/report/out',
    [jwtauth, isManager],
    transactions.getBranchOutReport
  );

  router.get(
    '/report/out/count',
    [jwtauth, isManager],
    transactions.getBranchOutCount
  );

  router.get('/', [jwtauth, isEmployee], transactions.findAll);

  app.use('/transactions', router);
};
