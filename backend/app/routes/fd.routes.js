const { jwtauth } = require('../middleware/jwt');

module.exports = (app) => {
  const fds = require('../controllers/fdController');

  const router = require('express').Router();

  router.post('/add', [jwtauth], fds.createFD);
  router.get('/customer', [jwtauth], fds.getCustomerFD);
  router.get('/:id', [jwtauth], fds.getFromID);
  app.use('/fixedDeposits', router);
};
