const { jwtauth } = require('../middleware/jwt');

module.exports = (app) => {
  const accounts = require('../controllers/accountController');

  const router = require('express').Router();

  router.get('/customer/:customerID', [jwtauth], accounts.findAll);

  router.get('/', accounts.findAll);

  router.get('/:id', [jwtauth], accounts.getFromID);

  router.post('/create', accounts.create);

  app.use('/accounts', router);
};
