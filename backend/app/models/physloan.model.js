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

module.exports = physLoan;
