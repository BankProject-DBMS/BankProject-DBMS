const { jwtauth } = require('../middleware/jwt');

module.exports = (app) => {
  const accounts = require('../controllers/accountController');

  const router = require('express').Router();

  router.get('/customer', [jwtauth], accounts.findAll);

  router.get('/', [jwtauth], accounts.findAll);

  router.get('/:id', [jwtauth], accounts.getFromID);

  router.post('/create', [jwtauth], accounts.create);

  app.use('/accounts', [jwtauth], router);
};
