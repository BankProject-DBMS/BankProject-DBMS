const onlineCustomers = require('../models/online.customer.model');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

exports.customerLogin = (req, res) => {
  const userName = req.body.loginDetails.userName;
  const password = req.body.loginDetails.password;

  onlineCustomers.findByUsername(userName, (err, data) => {
    if (err.kind === 'not_found') {
      res.status(404).send({
        auth: 'fail',
        message: 'User not found',
      });
    } else if (err.kind === 'error') {
      res.status(500).send({
        auth: 'fail',
        message: 'Error retrieving user',
      });
    } else {
      if (data.Password === password) {
        const token = jwt.sign({ ...data, role: 'customer' }, JWT_SECRET, {
          expiresIn: '15m',
        });
        const customerID = data.CustomerID;
        res.send({
          auth: 'success',
          role: 'customer',
          expires: '15m',
          customerID,
          userName,
          token,
        });
      } else {
        res.send({ auth: 'fail', message: 'Incorrect Password' });
      }
    }
  });
};
