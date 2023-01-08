module.exports = (app) => {
  const auth = require('../controllers/authController');

  const router = require('express').Router();

  router.post('/customer', auth.customerLogin);

  router.post('/employee', auth.employeeLogin);

  app.use('/login', router);
};
