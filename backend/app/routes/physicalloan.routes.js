const { jwtauth } = require('../middleware/jwt');
const {
  isAccountOwnedByCustomer,
  isManager,
} = require('../middleware/middleware');

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
  router.get(
    '/needApproval',
    [jwtauth, isManager],
    physLoans.getLoansNeedingApproval
  );

  router.put('/approve/:loanID', [jwtauth, isManager], physLoans.approveLoan);

  router.put('/reject/:loanID', [jwtauth, isManager], physLoans.rejectLoan);

  router.get('/:loanID', [jwtauth, isManager], physLoans.getPhysicalLoanByID);

  app.use('/physicalLoans', router);
};
