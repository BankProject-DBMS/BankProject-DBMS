const sql = require('./db.js');

const Loan = function (loan) {
  this.CustomerID = loan.CustomerID;
  this.BranchID = loan.BranchID;
  this.EmployeeID = loan.EmployeeID;
  this.Amount = loan.Amount;
  this.TypeID = loan.TypeID;
  this.SavingAccountID = loan.SavingAccountID;
};

Loan.getAll = (result) => {
  let query = 'SELECT * FROM PhysicalLoan';

  sql.query(query, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    // console.log('Customers: ', res);
    result(null, res);
    return;
  });
};

Loan.create = (newLoan, result) => {
    sql.query('INSERT INTO PhysicalLoan SET ?', newLoan, (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }
  
      console.log('Created Loan:', newLoan);
      result(null, newLoan);
    });
  };
  
module.exports = Loan;