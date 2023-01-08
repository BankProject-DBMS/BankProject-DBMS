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
    'SELECT * from physicalloaninstallment WHERE AccountID = ?',
    accountID,
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result({ kind: 'error', ...err }, null);
        return;
      }
      sql.query(
        'SELECT * from physicalloan WHERE LoanID = ?',
        accountID,
        (err, res) => {
          if (res.length) {
            console.log(res);
            if (
              req.user.role === 'customer' &&
              !(req.user.CustomerID === res[0].CustomerID)
            ) {
              console.log('no access physical loan installments find by id');
              result({ kind: 'access denied' }, null);
              return;
            }

            console.log('found installments for account: ', res[0]);
            result({ kind: 'success' }, res[0]);
          } else {
            result({ kind: 'not_found' }, null);
          }
        }
      );
    }
  );
};
module.exports = physLoan;
