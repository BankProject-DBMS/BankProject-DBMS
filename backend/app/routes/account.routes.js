module.exports = (app) => {
  const accounts = require('../controllers/accountController');

  const router = require('express').Router();

  router.get('/customer/:customerID', accounts.findAll);

  router.get('/', accounts.findAll);

  router.get('/:id', accounts.getFromID);

  router.post('/create', accounts.create);

  app.use('/accounts', router);
};
