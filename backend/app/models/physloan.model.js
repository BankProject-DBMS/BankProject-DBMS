const sql = require('./db.js');

const physLoan = function (loan) {
  this.CustomerID = loan.customerID;
  this.BranchID = loan.branchID;
  this.EmployeeID = loan.employeeID;
  this.Amount = loan.amount;
  this.Duration = loan.duration;
  this.InterestRate = loan.interestRate;
  this.SavingsAccountID = loan.savingsID;
};

//get all phyical loans for a given customer ID or get all physical loans
physLoan.getAll = (customerID, result) => {
  let query = 'SELECT * from PhysicalLoan';

  if (customerID) {
    query += ` WHERE CustomerID = ${sql.escape(customerID)}`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result({ kind: 'error', ...err }, null);
      return;
    }

    if (res.length) {
      console.log('found physLoans: ', res);
      result({ kind: 'success' }, res);
    } else {
      result({ kind: 'not_found' }, null);
    }
  });
};

//create a new physical loan
physLoan.create = (newPhysLoan, result) => {
  sql.query('INSERT INTO PhysicalLoan SET ?', newPhysLoan, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result({ kind: 'error', ...err }, null);
      return;
    }

    console.log('created physLoan: ', { id: res.insertId, ...newPhysLoan });
    result({ kind: 'success' }, { id: res.insertId, ...newPhysLoan });
  });
};

physLoan.getInstallmentsByAccountID = (accountID, req, result) => {
  sql.query(
    'SELECT * from PhysicalLoanInstallment WHERE LoanID = ?',
    accountID,
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result({ kind: 'error', ...err }, null);
        return;
      }
      sql.query(
        'SELECT * from PhysicalLoan WHERE LoanID = ?',
        accountID,
        (err, res1) => {
          if (res1.length) {
            console.log(res1);
            if (
              req.user.role === 'customer' &&
              !(req.user.CustomerID === res1[0].CustomerID)
            ) {
              console.log('no access physical loan installments find by id');
              result({ kind: 'access denied' }, null);
              return;
            }

            console.log('found installments for account: ', res);
            result({ kind: 'success' }, res);
          } else {
            result({ kind: 'not_found' }, null);
          }
        }
      );
    }
  );
};

physLoan.getUnpaidPhysicalInstallments = (result) => {
  const query =
    'select * from PhysicalLoanInstallment where DeadlineDate < CURRENT_TIMESTAMP and Paid = false order by DeadlineDate';
  sql.query(query, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result({ kind: 'error', ...err }, null);
      return;
    }

    if (res.length) {
      console.log('found unpaid installments: ', res);
      result({ kind: 'success' }, res);
    } else {
      result({ kind: 'not_found' }, null);
    }
  });
};

physLoan.getLoansNeedingApproval = (req, result) => {
  const branchID = req.user.BranchID;
  sql.query(
    'SELECT * from PhysicalLoan WHERE Approved = false and BranchID = ?',
    branchID,
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result({ kind: 'error' }, null);
        return;
      }

      if (res.length) {
        console.log('found loans needing approval: ', res);
        result({ kind: 'success' }, res);
      } else {
        console.log('no loans needing approval');
        result({ kind: 'not_found' }, null);
      }
    }
  );
};

physLoan.approveLoan = (loanID, result) => {
  sql.query('CALL approve_loan(?)', loanID, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result({ kind: 'error' }, null);
      return;
    }

    if (res === 'ALREADY_APPROVED') {
      console.log('loan already approved');
      result({ kind: 'already_approved' }, null);
    } else if (res === 'LOAN_NOT_FOUND') {
      console.log('loan not found');
      result({ kind: 'not_found' }, null);
    } else {
      console.log('loan approved');
      result({ kind: 'success' }, res);
    }
  });
};

physLoan.rejectLoan = (loanID, result) => {
  sql.query('DELETE FROM PhysicalLoan WHERE LoanID = ?', loanID, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result({ kind: 'error' }, null);
      return;
    }

    if (res.affectedRows === 0) {
      console.log('loan not found');
      result({ kind: 'not_found' }, null);
    }

    console.log('loan rejected');
    result({ kind: 'success' }, res);
  });
};

physLoan.getLoanByID = (loanID, result) => {
  sql.query(
    'SELECT * from PhysicalLoan WHERE LoanID = ?',
    loanID,
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result({ kind: 'error' }, null);
        return;
      }

      if (res.length) {
        console.log('found loan: ', res);
        result({ kind: 'success' }, res[0]);
      } else {
        console.log('loan not found');
        result({ kind: 'not_found' }, null);
      }
    }
  );
};

physLoan.getInstallmentByID = (installmentID, result) => {
  sql.query(
    'SELECT * from PhysicalLoanInstallment WHERE InstallmentID = ?',
    installmentID,
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result({ kind: 'error' }, null);
        return;
      }

      if (res.length) {
        console.log('found installment: ', res);
        result({ kind: 'success' }, res[0]);
      } else {
        console.log('installment not found');
        result({ kind: 'not_found' }, null);
      }
    }
  );
};

physLoan.payInstallment = (installmentID, result) => {
  sql.query('CALL pay_phys_installment(?)', installmentID, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result({ kind: 'error' }, null);
      return;
    }

    if (res === 'ALREADY_PAID') {
      console.log('installment already paid');
      result({ kind: 'already_paid ' }, null);
    } else if (res === 'INSTALLMENT_NOT_FOUND') {
      console.log('installment not found');
      result({ kind: 'not_found' }, null);
    } else if (res === 'FAILED') {
      console.log('installment payment failed');
      result({ kind: 'failed' }, null);
    } else {
      console.log('installment paid');
      result({ kind: 'success' }, res);
    }
  });
};

module.exports = physLoan;
