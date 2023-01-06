const sql = require('./db.js');

const fixedDeposit = function (fd) {
  this.SavingsAccountID = fd.savings;
  this.TypeID = fdTypes[fd.type];
  this.Amount = fd.amount;
};

fixedDeposit.create = (newFd, req, result) => {
  if (req.user.role === 'customer') {
    console.log('no access cust create');
    result({ kind: 'access denied' }, null);
    return;
  }
  const fdTypes = { 6: 'F061300', 12: 'F121450', 36: 'F361500' };
  const fixedD = {
    SavingsAccountID: newFd.savings,
    TypeID: fdTypes[newFd.type],
    Amount: newFd.amount,
  };

  sql.query('INSERT INTO FDAccount SET ?', fixedD, (err, res) => {
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
fixedDeposit.getAll = (customerID, req, result) => {
  let query =
    'SELECT FDAccount.AccountID,FDAccount.TypeID,SavingsAccountID,Amount,FDAccount.DateCreated,CustomerID from FDAccount join CashAccount on FDAccount.SavingsAccountID = CashAccount.AccountID';

  if (customerID) {
    query += ` WHERE CashAccount.CustomerID = ${sql.escape(customerID)}`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result({ kind: 'error', ...err }, null);
      return;
    }

    if (res.length) {
      console.log(res);
      if (
        req.user.role === 'customer' &&
        !(req.user.CustomerID === res[0].CustomerID)
      ) {
        console.log('no access fd get all');
        result({ kind: 'access denied' }, null);
        return;
      }
      console.log('found fds: ', res);
      result({ kind: 'success' }, res);
    } else {
      result({ kind: 'not_found' }, null);
    }
  });
};

fixedDeposit.findById = (id, req, result) => {
  console.log(
    `IN FD FIND BY ID ${id}----------------------------------------------------------------------------------------------`
  );
  sql.query(
    'SELECT FDAccount.AccountID,FDAccount.TypeID,SavingsAccountID,Amount,FDAccount.DateCreated,CustomerID from FDAccount join CashAccount on FDAccount.SavingsAccountID = CashAccount.AccountID WHERE FDAccount.AccountID = ?',
    id,
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result({ kind: 'error', ...err }, null);
        return;
      }

      if (res.length) {
        console.log(res);
        if (
          req.user.role === 'customer' &&
          !(req.user.CustomerID === res[0].CustomerID)
        ) {
          console.log('no access fd find by id');
          result({ kind: 'access denied' }, null);
          return;
        }

        console.log('found account: ', res[0]);
        result({ kind: 'success' }, res[0]);
      } else {
        result({ kind: 'not_found' }, null);
      }
    }
  );
};
module.exports = fixedDeposit;
