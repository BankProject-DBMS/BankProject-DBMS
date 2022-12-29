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

    // console.log('Withdrawals: ', res);
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
  sql.query('SELECT * FROM Withdrawal WHERE AccountID = ?', accountid, (err, res) => {
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
  });
};

Withdrawal.create = (newWithdrawal, result) => {
  sql.query('INSERT INTO Withdrawal SET ?', newWithdrawal, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    console.log('Created Withdrawal:', newWithdrawal);
    const account = newWithdrawal.AccountID;
    const amount = newWithdrawal.Amount;

    query0 = `select balance from cashaccount where accountid = ?`;
    query1 = `select typeid from cashaccount where accountid = ?`;

    sql.query(query0, [account], (err,res)=>{
      if (err) {
        console.log('error: ', err);
        result( err, null);
        return;
      }
      balance = res;
    });
    sql.query(query1, [account],(err, res)=>{
      if (err) {
        console.log('error: ', err);
        result( err, null);
        return;
      }
      if (res == "ST"){balance -= 500}
      else if (res == "SA"){balance -= 1000}
      else if (res == "SS"){balance -= 1000}
      if (balance - amount < 0){
        console.log('Insufficient Balance');
        result( 'Insuficient balance', null);
        return;
      }
    });
    
    query2 = `update cashaccount set balance = balance - ? where accountID = ? and wcount < 5`;

    sql.query(query2, [amount, account], (err, res) => {
    
      if (err) {
        console.log('error: ', err);
        result( err, null);
        return;
      }
      result(null, newWithdrawal);
    });
  });
};

module.exports = Withdrawal;
