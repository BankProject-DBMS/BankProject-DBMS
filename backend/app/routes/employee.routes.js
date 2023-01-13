module.exports = (app) => {
  const employee = require('../controllers/employeeController');
  const { jwtauth } = require('../middleware/jwt');
  const { isManager } = require('../middleware/middleware');
  const router = require('express').Router();

  router.post('/create', [jwtauth, isManager], employee.create);

  router.get('/', [jwtauth, isManager], employee.getAll);

  app.use('/employees', router);
};
