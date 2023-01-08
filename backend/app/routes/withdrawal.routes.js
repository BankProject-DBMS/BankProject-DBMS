module.exports = (app) => {
  const withdrawals = require('../controllers/withdrawalController');
  const { jwtauth } = require('../middleware/jwt.js');

  const router = require('express').Router();

  router.post('/', [jwtauth], withdrawals.findAll);

  router.post('/add', [jwtauth], withdrawals.create);

  router.get('/findByID', [jwtauth], withdrawals.findByAccountID);

  app.use('/withdrawals', router);
};
