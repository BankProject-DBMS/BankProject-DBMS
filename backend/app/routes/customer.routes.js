module.exports = (app) => {
  const customers = require('../controllers/customerController');

  const router = require('express').Router();

  router.post('/', customers.findAll);

  router.post('/add', customers.createCustomer);

  app.use('/customers', router);
};
