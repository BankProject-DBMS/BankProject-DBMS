const { query } = require('express');
const sql = require('./db.js');

const Deposit = function (deposit) {
  this.AccountID = deposit.AccountID;
  this.Amount = deposit.Amount;
  this.Remark = deposit.Remark;
  this.DepositTime = deposit.DepositTime;
};

Deposit.getAll = (transactionID, result) => {
  let query1 = 'SELECT * FROM Deposit';

  sql.query(query1, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    result(null, res);
    return;
  });
};

Deposit.findById = (id, result) => {
  sql.query('SELECT * FROM Deposit WHERE TransactionID = ?', id, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log('found deposit: ', res[0]);
      result(null, res[0]);
      return;
    }
  });
};

Deposit.findByAccountId = (accountid, result) => {
  sql.query(
    'SELECT * FROM Deposit WHERE AccountID = ?',
    accountid,
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log('found deposit: ', res);
        result(null, res);
        return;
      }
    }
  );
};

Deposit.create = (newDeposit, result) => {
  sql.query('INSERT INTO Deposit SET ?', newDeposit, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    console.log('Created Deposit:', newDeposit);
    const account = newDeposit.accountID;
    const amount = newDeposit.amount;

    query0 = `update CashAccount set Balance = Balance + ? where AccountID = ?`;

    sql.query(query0, [amount, account], (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }
      console.log('updated balance');
      if (res.affectedRows == 0) {
        result('deposit failed', null);
        return;
      }
      result(null, newDeposit);
    });
  });
};

module.exports = Deposit;
