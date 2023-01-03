const sql = require('./db.js');

const Account = function (account) {
  this.CustomerID = account.customerID;
  this.DateCreated = account.dateCreated;
  this.accountType = account.accountType;
  this.balance = account.balance;
  this.WCount = account.wCount;
};

// SQL query to get all accounts for a customer or all accounts
Account.getAll = (customerID, result) => {
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
      console.log('found accounts: ', res);
      result({ kind: 'success' }, res);
    } else {
      result({ kind: 'not_found' }, null);
    }
  });
};

// SQL query to find an account by ID
Account.findById = (id, result) => {
  sql.query('SELECT * FROM CashAccount WHERE AccountID = ?', id, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result({ kind: 'error', ...err }, null);
      return;
    }

    if (res.length) {
      console.log('found account: ', res[0]);
      result({ kind: 'success' }, res[0]);
    } else {
      result({ kind: 'not_found' }, null);
    }
  });
};

// SQL query to create a new account
Account.create = (newAccount, result) => {
  sql.query('INSERT INTO CashAccount SET ?', newAccount, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result({ kind: 'error', ...err }, null);
      return;
    }

    console.log('created account: ', newAccount);
    result({ kind: 'success' }, newAccount);
  });
};

// SQL query to update balance of an account
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
