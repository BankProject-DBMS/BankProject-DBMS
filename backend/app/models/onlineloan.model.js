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
  console.log('in get all');
  let query = 'SELECT * from OnlineLoan';

  if (customerID) {
    query += ` WHERE CustomerID = ${sql.escape(customerID)}`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result({ kind: 'error', ...err }, null);
      return;
    }
    console.log(res);
    if (res.length) {
      console.log('found onlineLoans: ', res);
      result({ kind: 'success' }, res);
    } else {
      result({ kind: 'not_found' }, null);
    }
  });
};

onlineLoan.create = (newOnlineLoan, result) => {
  console.log('IN OL model', newOnlineLoan);
  sql.query(
    'SELECT BranchID FROM CashAccount WHERE AccountID = ?',
    newOnlineLoan.SavingsAccountID,
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result({ kind: 'error', ...err }, null);
        return;
      }
      console.log(res);
      newOnlineLoan.BranchID = res[0].BranchID;
      sql.query('INSERT INTO OnlineLoan SET ?', newOnlineLoan, (err, res) => {
        if (err) {
          console.log('error: ', err);
          result({ kind: 'error', ...err }, null);
          return;
        }

        console.log('created Online Loan: ', {
          id: res.insertId,
          ...newOnlineLoan,
        });
        result({ kind: 'success' }, { id: res.insertId, ...newOnlineLoan });
      });
    }
  );
};

onlineLoan.getInstallmentsByAccountID = (accountID, req, result) => {
  sql.query(
    'SELECT * from OnlineLoanInstallment WHERE LoanID = ?',
    accountID,
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result({ kind: 'error', ...err }, null);
        return;
      }
      sql.query(
        'SELECT * from OnlineLoan WHERE LoanID = ?',
        accountID,
        (err, res1) => {
          if (res1.length) {
            console.log(res1);
            if (
              req.user.role === 'customer' &&
              !(req.user.CustomerID === res1[0].CustomerID)
            ) {
              console.log('no access online loan installments find by id');
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
module.exports = onlineLoan;
