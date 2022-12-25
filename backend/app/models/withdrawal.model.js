const sql = require('./db.js');

const Withdrawal = function (withdrawal) {
    
    this.AccountID = withdrawal.AccountID;
    this.Amount = withdrawal.Amount;
    this.Remark = withdrawal.Remark;
    this.WithdrawalTime = withdrawal.WithdrawalTime;
};

Withdrawal.getAll = (transactionID, result) => {
  let query = 'SELECT * FROM Withdrawal';

  sql.query(query, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    // console.log('Withdrawals: ', res);
    result(null, res);
    return;
  });
};

Withdrawal.findById = (id, result) => {
  sql.query('SELECT * FROM Withdrawal WHERE TransactionID = ?', id, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log('found tutorial: ', res[0]);
      result(null, res[0]);
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
    result(null, newWithdrawal);
  });
};

/*
Withdrawal.remove = (id, result) => {
  sql.query('DELETE FROM Withdrawal WHERE TransactionID = ?', id, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    console.log(`Deleted withdrawal with id: ${id}`);
  });
};

Customer.removeAll = (result) => {
  sql.query('DELETE FROM Withdrawal', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    console.log(`Deleted ${res.affectedRows} withdrawals`);
    result(null, res);
  });
};
*/

module.exports = Withdrawal;
