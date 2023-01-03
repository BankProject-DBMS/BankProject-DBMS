module.exports = (app) => {
  const physLoans = require('../controllers/physicalloanController');

  const router = require('express').Router();

  router.get('/customer/:customerID', physLoans.getCustomerPhysicalLoans);

  app.use('/physicalLoans', router);
};
