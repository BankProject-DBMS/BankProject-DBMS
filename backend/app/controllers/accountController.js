const AccountModel = require('../models/account.model');

// Retrieve all accounts for a customer or all accounts
exports.findAll = (req, res) => {
  //console.log(req.params);
  const customerID = req.user.CustomerID;
  AccountModel.getAll(customerID, req, (err, data) => {
    if (err.kind === 'not_found') {
      res.status(404).send({
        message: `No accounts found for customer ${customerID}.`,
      });
    } else if (err.kind != 'success') {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving accounts.',
      });
    } else res.send(data);
  });
};

// Retrieve an account by ID
exports.getFromID = (req, res) => {
  const accountID = req.params.id;
  AccountModel.findById(accountID, req, (err, data) => {
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

// Create a new account
exports.create = (req, res) => {
  console.log(req.user.BranchID);
  const account = {
    CustomerID: req.body.account.customerID,
    TypeID: req.body.account.accountType,
    BranchID: req.user.BranchID,
    Balance: req.body.account.initialBalance,
  };
  AccountModel.create(account, req, (err, data) => {
    if (err.kind === 'error') {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating account.',
      });
    } else res.send(data);
  });
};
