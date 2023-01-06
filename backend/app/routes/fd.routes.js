const { jwtauth } = require('../middleware/jwt');

module.exports = (app) => {
  const fds = require('../controllers/fdController');

  const router = require('express').Router();

  router.post('/add', fds.createFD);
  router.get('/customer', [jwtauth], fds.getCustomerFD);

  app.use('/fixedDeposits', router);
};
