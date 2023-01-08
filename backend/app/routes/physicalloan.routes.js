const { jwtauth } = require('../middleware/jwt');
const { isAccountOwnedByCustomer } = require('../middleware/middleware');

module.exports = (app) => {
  const physLoans = require('../controllers/physicalloanController');

  const router = require('express').Router();

  router.get('/customer', [jwtauth], physLoans.getCustomerPhysicalLoans);

  router.post(
    '/create',
    [jwtauth, isAccountOwnedByCustomer],
    physLoans.createPhysicalLoan
  );
  router.get(
    '/physicalLoanInstallment/:accountID',
    [jwtauth],
    physLoans.getAccountInstallments
  );
  app.use('/physicalLoans', router);
};
