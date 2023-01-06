module.exports = (app) => {
  const customers = require('../controllers/customerController');
  const { jwtauth } = require('../middleware/jwt.js');
  const router = require('express').Router();

  router.post('/', customers.findAll);

  router.get('/', customers.getFromID);

  router.put('/:id', customers.updateCustomer);

  router.post('/add', customers.createCustomer);

  app.use('/customers', router);
};
