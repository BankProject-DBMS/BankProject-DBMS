module.exports = (app) => {
  const onlineCustomers = require('../controllers/authController');

  const router = require('express').Router();

  router.post('/customer', onlineCustomers.customerLogin);

  app.use('/login', router);
};
