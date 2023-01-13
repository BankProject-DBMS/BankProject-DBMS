const { jwtauth } = require('../middleware/jwt');
const { isManager } = require('../middleware/middleware');

module.exports = (app) => {
  const onlineLoans = require('../controllers/onlineloanController');

  const router = require('express').Router();

  router.get('/customer', [jwtauth], onlineLoans.getCustomerOnlineLoans);
  router.get(
    '/onlineLoanInstallment/:accountID',
    [jwtauth],
    onlineLoans.getAccountInstallments
  );

  router.get(
    '/onlineLoanInstallmentUnpaid',
    [jwtauth, isManager],
    onlineLoans.getUnpaidOnlineInstallments
  );

  router.get(
    '/installment/:installmentID',
    [jwtauth],
    onlineLoans.getInstallment
  );

  router.put(
    '/installmentPay/:installmentID',
    [jwtauth],
    onlineLoans.payInstallment
  );

  router.post('/create', [jwtauth], onlineLoans.createOnlineLoan);

  app.use('/onlineLoans', router);
};
