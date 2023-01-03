module.exports = (app) => {
  const fds = require('../controllers/fdController');

  const router = require('express').Router();

  router.post('/add', fds.createFD);
  router.get('/customer/:customerID', fds.getCustomerFD);

  app.use('/fixedDeposits', router);
};
