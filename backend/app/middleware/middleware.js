const AccountModel = require('../models/account.model');

const isAccountOwnedByCustomer = (req, res, next) => {
  if (req.user.role === 'employee' || req.user.role === 'manager') {
    console.log(req.body.loan);
    const { savingsAccountID, customerID } = req.body.loan;

    if (savingsAccountID && customerID) {
      AccountModel.findById(savingsAccountID, req, (err, data) => {
        if (err.kind === 'not_found') {
          console.log('not found');
          res.status(404).send({
            message: `No account found with id ${savingsAccountID}.`,
          });
        } else if (err.kind === 'success' && data.CustomerID === customerID) {
          console.log('Account is owned by customer');
          next();
        } else {
          res.status(500).send({
            message:
              err.message || 'Some error occurred while retrieving account.',
          });
        }
      });
    } else {
      res.status(400).send({
        message: 'Bad Request',
      });
    }
  } else {
    res.status(401).send({
      message: 'Access Denied to Page',
    });
  }
};

const isEmployee = (req, res, next) => {
  if (req.user.role === 'employee' || req.user.role === 'manager') {
    next();
  } else {
    res.status(401).send({
      message: 'Unauthorized Access',
    });
  }
};

const isManager = (req, res, next) => {
  if (req.user.role === 'manager') {
    next();
  } else {
    res.status(401).send({
      message: 'Unauthorized Access',
    });
  }
};

module.exports = { isAccountOwnedByCustomer, isEmployee, isManager };
