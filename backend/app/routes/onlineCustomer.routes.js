module.exports = (app) => {
  const onlineCustomer = require('../controllers/authController');
  const { jwtauth } = require('../middleware/jwt.js');
  const { isEmployee } = require('../middleware/middleware.js');
  const router = require('express').Router();

  router.post(
    '/add',
    [jwtauth, isEmployee],
    onlineCustomer.createOnlineCustomer
  );

  app.use('/onlineCustomer', router);
};
