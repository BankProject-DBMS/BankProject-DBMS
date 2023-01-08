const { jwtauth } = require('../middleware/jwt');

module.exports = (app) => {
  const onlineLoans = require('../controllers/onlineloanController');

  const router = require('express').Router();

  router.get('/customer', [jwtauth], onlineLoans.getCustomerOnlineLoans);
  router.get(
    '/onlineLoanInstallment/:accountID',
    [jwtauth],
    onlineLoans.getAccountInstallments
  );
  app.use('/onlineLoans', router);
};
