const OnlineLoanModel = require('../models/onlineloan.model');

//
exports.getCustomerOnlineLoans = (req, res) => {
  console.log('In oloan.contr');
  if (req.user.CustomerID) {
    const customerID = req.user.CustomerID;
    OnlineLoanModel.getAll(customerID, (err, data) => {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `No online loans found for customer ${customerID}.`,
        });
      } else if (err.kind != 'success') {
        res.status(500).send({
          message:
            err.message || 'Some error occurred while retrieving accounts.',
        });
      } else res.send(data);
    });
  } else {
    OnlineLoanModel.getAll((err, data) => {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `No online loans found for customer ${customerID}.`,
        });
      } else if (err.kind != 'success') {
        res.status(500).send({
          message:
            err.message || 'Some error occurred while retrieving accounts.',
        });
      } else res.send(data);
    });
  }
};

exports.getAccountInstallments = (req, res) => {
  const accountID = req.params.accountID;
  OnlineLoanModel.getInstallmentsByAccountID(accountID, req, (err, data) => {
    if (err.kind === 'not_found') {
      res.status(404).send({
        message: `No account found with id ${accountID}.`,
      });
    } else if (err.kind != 'success') {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving account.',
      });
    } else if (err.kind === 'access denied') {
      res.status(401).send({
        message: err.message || 'Access Denied to Page',
      });
    } else res.send(data);
  });
};
