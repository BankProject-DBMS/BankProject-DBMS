module.exports = (app) => {
    const loan = require('../controllers/loanController');
  
    const router = require('express').Router();
  
    router.post('/', loan.findAll);
  
    router.post('/add', loan.createLoan);
  
    app.use('/customers', router);
  };
