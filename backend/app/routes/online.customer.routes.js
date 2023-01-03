module.exports = (app) => {
  const onlineCustomers = require('../controllers/authController');

  const router = require('express').Router();

  router.post('/customer', onlineCustomers.login);

  app.use('/login', router);
};
