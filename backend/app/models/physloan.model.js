const sql = require('./db.js');

const physLoan = function (loan) {
  this.LoanID = loan.loanID;
  this.Amount = loan.amount;
  this.BranchID = loan.branchID;
  this.TypeID = loan.typeID;
  this.SavingsAccountID = loan.savingsID;
};

//get all phyical loans for a given customer ID or get all physical loans
physLoan.getAll = (customerID, result) => {
  let query =
    'SELECT LoanID, Amount, BranchID, TypeID, SavingsAccountID from physicalloan';

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

module.exports = physLoan;
