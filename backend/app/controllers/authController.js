const onlineCustomers = require('../models/online.customer.model');
const onlineEmployee = require('../models/employee.model');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

exports.customerLogin = (req, res) => {
  const userName = req.body.loginDetails.userName;
  const password = req.body.loginDetails.password;
  const bcrypt = require('bcrypt');

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
      hash = data.Password;
      bcrypt.compare(password, hash, function (err, result) {
        // result == true
        if (err === 'error') {
          res.status(500).send({
            auth: 'fail',
            message: 'Error retrieving user',
          });
        } else if (result === true) {
          const token = jwt.sign({ ...data, role: 'customer' }, JWT_SECRET, {
            expiresIn: '2h',
          });
          const customerID = data.CustomerID;
          res.send({
            auth: 'success',
            role: 'customer',
            expires: '2h',
            customerID,
            userName,
            token,
          });
        } else {
          res.status(401).send({ auth: 'fail', message: 'Incorrect Password' });
        }
      });
    }
  });
};

exports.employeeLogin = (req, res) => {
  console.log('in auth controller');
  const userName = req.body.loginDetails.userName;
  const password = req.body.loginDetails.password;
  const bcrypt = require('bcrypt');

  onlineEmployee.findByUsername(userName, (err, data) => {
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
      hash = data.Password;
      bcrypt.compare(password, hash, function (err, result) {
        if (err === 'error') {
          res.status(500).send({
            auth: 'fail',
            message: 'Error retrieving user',
          });
        } else if (result === true) {
          const role = data.isManager ? 'manager' : 'employee';
          const token = jwt.sign({ ...data, role: role }, JWT_SECRET, {
            expiresIn: '2h',
          });
          const employeeID = data.EmployeeID;
          const branchID = data.BranchID;
          res.send({
            auth: 'success',
            role: role,
            employeeID,
            branchID,
            userName,
            token,
          });
        } else {
          res.status(401).send({ auth: 'fail', message: 'Incorrect Password' });
        }
      });
    }
  });
};

exports.createOnlineCustomer = (req, res) => {
  // console.log(req.body);
  const onlineCustomer = req.body.onlineCustomer;
  onlineCustomers.create(onlineCustomer, (err, data) => {
    if (err.kind === 'error')
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating online customer.',
      });
    else res.send(data);
  });
};
