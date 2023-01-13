const sql = require('./db.js');

const Account = function (account) {
  this.CustomerID = account.customerID;
  this.DateCreated = account.dateCreated;
  this.accountType = account.accountType;
  this.balance = account.balance;
  this.WCount = account.wCount;
};

// SQL query to get all accounts for a customer or all accounts
Account.getAll = (customerID, req, result) => {
  let query = 'SELECT * FROM CashAccount';

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
      if (
        req.user.role === 'customer' &&
        !(req.user.CustomerID === res[0].CustomerID)
      ) {
        console.log('no access account get all');
        result({ kind: 'access denied' }, null);
        return;
      }
      console.log('found accounts: ', res);
      result({ kind: 'success' }, res);
    } else {
      result({ kind: 'not_found' }, null);
    }
  });
};

// SQL query to find an account by ID
Account.findById = (id, req, result) => {
  sql.query('SELECT * FROM CashAccount WHERE AccountID = ?', id, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result({ kind: 'error', ...err }, null);
      return;
    }

    if (res.length) {
      if (
        req.user.role === 'customer' &&
        !(req.user.CustomerID === res[0].CustomerID)
      ) {
        console.log('no access acc find by id');
        result({ kind: 'access denied' }, null);
        return;
      }

      console.log('found account: ', res[0]);
      result({ kind: 'success' }, res[0]);
    } else {
      result({ kind: 'not_found' }, null);
    }
  });
};

// SQL query to create a new account
Account.create = (newAccount, req, result) => {
  sql.query(
    'SELECT WCountMax FROM CashAccountType WHERE TypeID = ?',
    newAccount.TypeID,
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result({ kind: 'error', ...err }, null);
        return;
      }
      newAccount.WCount = res[0].WCountMax;

      sql.query('INSERT INTO CashAccount SET ?', newAccount, (err, res) => {
        if (err) {
          console.log('error: ', err);
          result({ kind: 'error', ...err }, null);
          return;
        }
        if (req.user.role === 'customer') {
          console.log('no access acc create');
          result({ kind: 'access denied' }, null);
          return;
        }

        console.log('created account: ', newAccount);
        result({ kind: 'success' }, newAccount);
      });
    }
  );
};

// SQL query to update balance of an account
// TODO set permissions

Account.updateBalance = (id, amount, result) => {
  sql.query(
    'UPDATE CashAccount SET Balance = Balance + ? WHERE AccountID = ?',
    [balance, id],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result({ kind: 'error', ...err }, null);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: 'not_found' }, null);
      } else {
        console.log('updated account: ', { id: id, ...balance });
        result({ kind: 'success' }, { id: id, ...balance });
      }
    }
  );
};

module.exports = Account;
