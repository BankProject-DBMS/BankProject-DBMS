const { query } = require('express');
const sql = require('./db.js');

const Withdrawal = function (withdrawal) {
  this.AccountID = withdrawal.AccountID;
  this.Amount = withdrawal.Amount;
  this.Remark = withdrawal.Remark;
  this.WithdrawalTime = withdrawal.WithdrawalTime;
};

Withdrawal.getAll = (transactionID, result) => {
  let query1 = 'SELECT * FROM Withdrawal';

  sql.query(query1, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    console.log('Withdrawals: ', res);
    result(null, res);
    return;
  });
};

Withdrawal.findById = (id, result) => {
  sql.query(
    'SELECT * FROM Withdrawal WHERE TransactionID = ?',
    id,
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log('found withdrawal: ', res[0]);
        result(null, res[0]);
        return;
      }
    }
  );
};

Withdrawal.findByAccountId = (accountid, result) => {
  sql.query(
    'SELECT * FROM Withdrawal WHERE AccountID = ?',
    accountid,
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log('found withdrawal: ', res);
        result(null, res);
        return;
      }
    }
  );
};

Withdrawal.create = (newWithdrawal, result) => {
  console.log('model withdrawal:', newWithdrawal);
  sql.query(
    'call withdrawals_procedure(?,?,?,@code)',
    [newWithdrawal.accountID, newWithdrawal.amount, newWithdrawal.remark],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }

      sql.query('SELECT @code', (err, res) => {
        if (err) {
          console.log('error: ', err);
          result(err, null);
          return;
        }

        result(err, res);
        return;
      });
    }
  );
};

module.exports = Withdrawal;
