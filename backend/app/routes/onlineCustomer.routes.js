module.exports = (app) => {
    const onlineCustomer = require('../controllers/authController');
    const { jwtauth } = require('../middleware/jwt.js');
    const router = require('express').Router();
  
    router.post('/add', [jwtauth], onlineCustomer.createOnlineCustomer);
  
    app.use('/onlineCustomer', router);
  };