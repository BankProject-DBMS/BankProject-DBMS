module.exports = (app) => {
  const customers = require('../controllers/customerController');

  const router = require('express').Router();

  router.post('/', customers.findAll);

  app.use('/customers', router);
};
