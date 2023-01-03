const sql = require('./db.js');

const onlineLoan = function (loan) {
  this.LoanID = loan.loanID;
  this.Amount = loan.amount;
  this.FDAccountID = loan.fdaccountID;
  this.TypeID = loan.typeID;
  this.SavingsAccountID = loan.savingsID;
};

//get all phyical loans for a given customer ID or get all online loans
onlineLoan.getAll = (customerID, result) => {
  let query =
    'SELECT LoanID, Amount, FDAccountID, TypeID, SavingsAccountID from OnlineLoan';

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
      console.log('found onlineLoans: ', res);
      result({ kind: 'success' }, res);
    } else {
      result({ kind: 'not_found' }, null);
    }
  });
};

module.exports = onlineLoan;
