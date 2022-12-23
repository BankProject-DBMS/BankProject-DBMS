module.exports = (app) => {
    const fds = require('../controllers/fdController');

    const router = require('express').Router();

    router.post('/add', customers.createCustomer);

    app.use('/fixedDeposits', router);
};
