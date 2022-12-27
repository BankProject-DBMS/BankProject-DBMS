module.exports = (app) => {
    const fds = require('../controllers/fdController');

    const router = require('express').Router();

    router.post('/add', fds.createFD);

    app.use('/fixedDeposits', router);
};
