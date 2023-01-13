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
    OnlineLoanModel.getAll(null, (err, data) => {
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
function calculateInterestRate(amount, duration) {
  let interestRate = 20;

  // Increase interest rate based on loan amount
  if (amount > 10000) {
    interestRate += 5;
  }
  if (amount > 100000) {
    interestRate += 10;
  }
  if (amount > 1000000) {
    interestRate += 15;
  }

  // Increase interest rate based on loan duration
  if (duration > 12) {
    interestRate += 5;
  }
  if (duration > 24) {
    interestRate += 10;
  }
  if (duration > 36) {
    interestRate += 15;
  }

  // Add an additional random factor to the interest rate
  interestRate += Math.random() * 5 - 2.5;

  return interestRate;
}

exports.createOnlineLoan = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  } else if (req.user.role === 'customer') {
    console.log('controller OL', req.body.loan);
    const onlineLoan = {
      CustomerID: req.user.CustomerID,
      Amount: req.body.loan.amount,
      Duration: req.body.loan.duration,
      SavingsAccountID: req.body.loan.savingsAccountID,
      FDAccountID: req.body.loan.fdAccountID,
    };

    onlineLoan.InterestRate = calculateInterestRate(
      onlineLoan.Amount,
      onlineLoan.Duration
    );

    OnlineLoanModel.create(onlineLoan, (err, data) => {
      if (err.kind != 'success') {
        console.log(err);
        res.status(500).send({
          message:
            err.message || 'Some error occurred while creating the loan.',
        });
      } else {
        res.send(data);
      }
    });
  } else {
    res.status(403).send({
      message: 'You are not authorized to create a physical loan.',
    });
  }
};

exports.getAccountInstallments = (req, res) => {
  console.log(req);
  const LoanID = req.params.accountID;
  console.log(LoanID, 'ACCOUNT ID');
  OnlineLoanModel.getInstallmentsByAccountID(LoanID, req, (err, data) => {
    if (err.kind === 'not_found') {
      res.status(404).send({
        message: `No account found with id ${LoanID}.`,
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

exports.getUnpaidOnlineInstallments = (req, res) => {
  OnlineLoanModel.getUnpaidOnlineInstallments((err, data) => {
    if (err.kind === 'not_found') {
      res.status(404).send({
        message: 'No unpaid installments found.',
      });
    } else if (err.kind != 'success') {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving installments.',
      });
    } else res.send(data);
  });
};

exports.getInstallment = (req, res) => {
  const installmentID = req.params.installmentID;
  OnlineLoanModel.getInstallmentByID(installmentID, (err, data) => {
    if (err.kind === 'not_found') {
      res.status(404).send({
        message: `No installment found with id ${installmentID}.`,
      });
    } else if (err.kind != 'success') {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving installment.',
      });
    } else res.send(data);
  });
};

exports.payInstallment = (req, res) => {
  const installmentID = req.params.installmentID;
  OnlineLoanModel.payInstallment(installmentID, (err, data) => {
    if (err.kind === 'not_found') {
      res.status(404).send({
        message: `No installment found with id ${installmentID}.`,
      });
    } else if (err.kind === 'already_paid') {
      res.status(400).send({
        message: 'Installment has already been paid.',
      });
    } else if (err.kind != 'success') {
      res.status(500).send({
        message: err.message || 'Some error occurred while paying installment.',
      });
    } else res.send(data);
  });
};
