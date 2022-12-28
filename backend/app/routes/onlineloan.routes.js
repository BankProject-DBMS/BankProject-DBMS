module.exports = (app) => {
  const onlineLoans = require('../controllers/onlineloanController');

  const router = require('express').Router();

  router.get('/customer/:customerID', onlineLoans.getCustomerOnlineLoans);

  app.use('/onlineLoans', router);
};
