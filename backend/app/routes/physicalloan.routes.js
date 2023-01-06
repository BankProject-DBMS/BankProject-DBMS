const { jwtauth } = require('../middleware/jwt');

module.exports = (app) => {
  const physLoans = require('../controllers/physicalloanController');

  const router = require('express').Router();

  router.get('/customer', [jwtauth], physLoans.getCustomerPhysicalLoans);

  app.use('/physicalLoans', router);
};
