module.exports = (app) => {
    const withdrawals = require('../controllers/withdrawalController');
  
    const router = require('express').Router();
  
    router.get('/', withdrawals.findAll);
  
    router.post('/add', withdrawals.create);

    router.get('/findByID',withdrawals.findByAccountID);
  
    app.use('/withdrawals', router);
  };