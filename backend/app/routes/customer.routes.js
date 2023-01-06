module.exports = (app) => {
  const customers = require('../controllers/customerController');
  const { jwtauth } = require('../middleware/jwt.js');
  const router = require('express').Router();

  router.post('/', [jwtauth], customers.findAll);

  router.get('/', [jwtauth], customers.getFromID);

  router.put('/:id', [jwtauth], customers.updateCustomer);

  router.post('/add', [jwtauth], customers.createCustomer);

  app.use('/customers', router);
};
