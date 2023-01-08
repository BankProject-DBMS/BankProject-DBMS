module.exports = (app) => {
  const deposites = require('../controllers/depositController');

  const router = require('express').Router();

  router.post('/', deposites.findAll);

  router.post('/add', deposites.create);

  router.get('/findByID', deposites.findByAccountID);

  app.use('/deposites', router);
};
