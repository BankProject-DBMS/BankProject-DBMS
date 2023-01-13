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

exports.getCustomerPhysicalLoanByID = (req, res) => {
  const customerID = req.user.CustomerID;
  const loanID = req.params.loanID;
  PhysLoanModel.getLoanByID(loanID, (err, data) => {
    if (err.kind === 'not_found') {
      res.status(404).send({
        message: `No physical loan found for customer ${customerID} with ID ${loanID}.`,
      });
    } else if (err.kind != 'success') {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving loan.',
      });
    } else {
      console.log(data);
      if (data.CustomerID === customerID) {
        res.send(data);
      } else {
        res.status(403).send({
          message: 'You are not authorized to view this loan.',
        });
      }
    }
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

exports.getAccountInstallments = (req, res) => {
  const accountID = req.params.accountID;
  PhysLoanModel.getInstallmentsByAccountID(accountID, req, (err, data) => {
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

exports.getLoansNeedingApproval = (req, res) => {
  PhysLoanModel.getLoansNeedingApproval(req, (err, data) => {
    if (err.kind === 'not_found') {
      res.status(404).send({
        message: 'No loans needing approval found.',
      });
    } else if (err.kind != 'success') {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving loans.',
      });
    } else res.send(data);
  });
};

exports.approveLoan = (req, res) => {
  const loanID = req.params.loanID;
  PhysLoanModel.approveLoan(loanID, (err, data) => {
    if (err.kind === 'not_found') {
      res.status(404).send({
        message: `No loan found with id ${loanID}.`,
      });
    } else if (err.kind === 'already_approved') {
      res.status(400).send({
        message: 'Loan has already been approved.',
      });
    } else if (err.kind != 'success') {
      res.status(500).send({
        message: err.message || 'Some error occurred while approving loan.',
      });
    } else res.send(data);
  });
};

exports.rejectLoan = (req, res) => {
  const loanID = req.params.loanID;
  PhysLoanModel.rejectLoan(loanID, (err, data) => {
    if (err.kind === 'not_found') {
      res.status(404).send({
        message: `No loan found with id ${loanID}.`,
      });
    } else if (err.kind != 'success') {
      res.status(500).send({
        message: err.message || 'Some error occurred while rejecting loan.',
      });
    } else res.send(data);
  });
};

exports.getPhysicalLoanByID = (req, res) => {
  const loanID = req.params.loanID;
  PhysLoanModel.getLoanByID(loanID, (err, data) => {
    if (err.kind === 'not_found') {
      res.status(404).send({
        message: `No loan found with id ${loanID}.`,
      });
    } else if (err.kind === 'access denied') {
      res.status(401).send({
        message: err.message || 'Access Denied to Page',
      });
    } else if (err.kind != 'success') {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving loan.',
      });
    } else res.send(data);
  });
};

exports.getUnpaidPhysicalInstallments = (req, res) => {
  console.log('Came into Unpaid');
  PhysLoanModel.getUnpaidPhysicalInstallments((err, data) => {
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
  PhysLoanModel.getInstallmentByID(installmentID, (err, data) => {
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
  PhysLoanModel.payInstallment(installmentID, (err, data) => {
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
