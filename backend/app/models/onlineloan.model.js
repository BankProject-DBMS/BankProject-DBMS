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
  let query =
    'SELECT LoanID, Amount, FDAccountID, SavingsAccountID from OnlineLoan';

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

onlineLoan.getInstallmentsByAccountID = (accountID, req, result) => {
  console.log('in get installments by account id');
  sql.query(
    'SELECT * from onlineloaninstallment WHERE AccountID = ?',
    accountID,
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result({ kind: 'error', ...err }, null);
        return;
      }
      sql.query(
        'SELECT * from onlineloan WHERE LoanID = ?',
        accountID,
        (err, res) => {
          if (res.length) {
            console.log(res);
            if (
              req.user.role === 'customer' &&
              !(req.user.CustomerID === res[0].CustomerID)
            ) {
              console.log('no access online loan installments find by id');
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
module.exports = onlineLoan;
