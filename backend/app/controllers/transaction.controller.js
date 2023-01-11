const TransactionModel = require('../models/transaction.model');

// Retrieve all outgoing transactions for an account
exports.getAllOutgoing = (req, res) => {
  const accountID = req.params.id;
  TransactionModel.getAllOutgoing(accountID, (err, data) => {
    if (err.kind === 'not_found') {
      res.status(404).send({
        message: `No outgoing transactions found for account ${accountID}.`,
      });
    } else if (err.kind != 'success') {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving transactions.',
      });
    } else res.send(data);
  });
};

// Retrieve all incoming transactions for an account
exports.getAllIncoming = (req, res) => {
  const accountID = req.params.id;
  TransactionModel.getAllIncoming(accountID, (err, data) => {
    if (err.kind === 'not_found') {
      res.status(404).send({
        message: `No incoming transactions found for account ${accountID}.`,
      });
    } else if (err.kind != 'success') {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving transactions.',
      });
    } else res.send(data);
  });
};

// Retrieve a transaction from an account by ID to another account by ID
exports.findFromTo = (req, res) => {
  const fromAccount = req.params.from;
  const toAccount = req.params.to;
  console.log(fromAccount, toAccount);
  TransactionModel.findFromTo(fromAccount, toAccount, (err, data) => {
    if (err.kind === 'not_found') {
      res.status(404).send({
        message: `No transaction found from account ${fromAccount} to account ${toAccount}.`,
      });
    } else if (err.kind != 'success') {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving transactions.',
      });
    } else res.send(data);
  });
};

// Create and Save a new Transaction
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }
  console.log('Came Here ', req.body);
  // Create a Transaction
  const transaction = {
    FromAccount: req.body.fromAccountID,
    ToAccount: req.body.toAccountID,
    Amount: req.body.amount,
    Remark: req.body.remarks,
  };

  // Save Transaction in the database
  TransactionModel.create(transaction, (err, data) => {
    if (err.kind === 'error') {
      res.status(500).send({
        message:
          err.err || 'Some error occurred while creating the Transaction.',
      });
    } else {
      res.send(data);
    }
  });
};

exports.findAll = (req, res) => {
  console.log(req.body);
  TransactionModel.getAll(null, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving transactions.',
      });
    else res.send(data);
  });
};

exports.getBranchInReport = (req, res) => {
  const branchID = req.user.BranchID;
  TransactionModel.getBranchInReport(branchID, (err, data) => {
    if (err.kind === 'error') {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving transactions.',
      });
    } else res.send(data);
  });
};

exports.getBranchInCount = (req, res) => {
  const branchID = req.user.BranchID;
  TransactionModel.getBranchInCount(branchID, (err, data) => {
    if (err.kind === 'error') {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving transactions.',
      });
    } else res.send(data);
  });
};

exports.getBranchOutReport = (req, res) => {
  const branchID = req.user.BranchID;
  TransactionModel.getBranchOutReport(branchID, (err, data) => {
    if (err.kind === 'error') {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving transactions.',
      });
    } else res.send(data);
  });
};

exports.getBranchOutCount = (req, res) => {
  const branchID = req.user.BranchID;
  TransactionModel.getBranchOutCount(branchID, (err, data) => {
    if (err.kind === 'error') {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving transactions.',
      });
    } else res.send(data);
  });
};
