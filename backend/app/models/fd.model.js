const sql = require('./db.js');

const fixedDeposit = function (fd) {
  this.SavingsAccountID = fd.savings;
  this.TypeID = fdTypes[fd.type];
  this.Amount = fd.amount;
};

fixedDeposit.create = (newFd, result) => {
  const fdTypes = { 6: 'F061300', 12: 'F121450', 36: 'F361500' };
  const fixedD = {
    SavingsAccountID: newFd.savings,
    TypeID: fdTypes[newFd.type],
    Amount: newFd.amount,
  };

  sql.query('INSERT INTO fdaccount SET ?', fixedD, (err, res) => {
    console.log('Created FD:', fixedD);
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    console.log('Created FD:', fixedD);
    result(null, fixedD);
  });
};

//get all fds for a given customer ID
fixedDeposit.getAll = (customerID, result) => {
  let query =
    'SELECT fdaccount.AccountID,fdaccount.TypeID,SavingsAccountID,Amount,fdaccount.DateCreated from fdaccount join cashaccount on fdaccount.SavingsAccountID = cashaccount.AccountID';

  if (customerID) {
    query += ` WHERE cashaccount.CustomerID = ${sql.escape(customerID)}`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result({ kind: 'error', ...err }, null);
      return;
    }

    if (res.length) {
      console.log('found fds: ', res);
      result({ kind: 'success' }, res);
    } else {
      result({ kind: 'not_found' }, null);
    }
  });
};

module.exports = fixedDeposit;
