const PhysLoanModel = require('../models/physloan.model');

//
exports.getCustomerPhysicalLoans = (req, res) => {
  const customerID = req.user.CustomerID;
  PhysLoanModel.getAll(customerID, (err, data) => {
    if (err.kind === 'not_found') {
      res.status(404).send({
        message: `No physical loans found for customer ${customerID}.`,
      });
    } else if (err.kind != 'success') {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving accounts.',
      });
    } else res.send(data);
  });
};

exports.createPhysicalLoan = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  } else if (req.user.role === 'employee' || req.user.role === 'manager') {
    const physLoan = {
      CustomerID: req.body.loan.customerID,
      BranchID: req.body.loan.branchID,
      EmployeeID: req.user.EmployeeID,
      Amount: req.body.loan.amount,
      Duration: req.body.loan.duration,
      SavingsAccountID: req.body.loan.savingsAccountID,
    };

    physLoan.InterestRate = calculateInterestRate(
      physLoan.Amount,
      physLoan.Duration
    );

    PhysLoanModel.create(physLoan, (err, data) => {
      if (err.kind === 'error') {
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
