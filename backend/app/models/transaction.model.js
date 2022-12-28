const sql = require('./db.js');

const Transaction = function (transaction) {
  this.AccountID = transaction.accountID;
  this.Date = transaction.date;
  this.Amount = transaction.amount;
  this.Type = transaction.type;
};

const getTransaction = (transaction) => {
  return {
    transactionID: transaction.TransactionID,
    fromAccount: transaction.FromAccount,
    toAccount: transaction.ToAccount,
    amount: transaction.Amount,
    remark: transaction.Remark,
    transactionTime: transaction.TransactionTime,
  };
};

// SQL query to get all outgoing transactions for an account
Transaction.getAllOutgoing = (accountID, result) => {
  const query = `SELECT * FROM Transaction WHERE FromAccount = ?`;
  sql.query(query, accountID, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result({ kind: 'error', ...err }, null);
      return;
    }

    if (res.length) {
      console.log('found transactions: ', res);
      const transactions = res.map((transaction) =>
        getTransaction(transaction)
      );
      result({ kind: 'success' }, transactions);
    } else {
      result({ kind: 'not_found' }, null);
    }
  });
};

// SQL query to get all incoming transactions for an account
Transaction.getAllIncoming = (accountID, result) => {
  const query = `SELECT * FROM Transaction WHERE ToAccount = ?`;
  sql.query(query, accountID, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result({ kind: 'error', ...err }, null);
      return;
    }

    if (res.length) {
      console.log('found transactions: ', res);
      const transactions = res.map((transaction) =>
        getTransaction(transaction)
      );
      result({ kind: 'success' }, transactions);
    } else {
      result({ kind: 'not_found' }, null);
    }
  });
};

// SQL query to find a transaction from an account by ID to another account by ID
Transaction.findFromTo = (fromAccount, toAccount, result) => {
  const query = `SELECT * FROM Transaction WHERE FromAccount = ? AND ToAccount = ?`;
  sql.query(query, [fromAccount, toAccount], (err, res) => {
    if (err) {
      console.log('error: ', err);
      result({ kind: 'error', ...err }, null);
      return;
    }

    if (res.length) {
      console.log('found transaction: ', res);
      const transactions = res.map((transaction) =>
        getTransaction(transaction)
      );
      result({ kind: 'success' }, transactions);
    } else {
      result({ kind: 'not_found' }, null);
    }
  });
};

// SQL query to create a new transaction
Transaction.create = (newTransaction, result) => {
  sql.query('INSERT INTO Transaction SET ?', newTransaction, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result({ kind: 'error', ...err }, null);
      return;
    }

    console.log('created transaction: ', newTransaction);
    // after creating a transaction, update the balance of both accounts
    const fromAccount = newTransaction.FromAccount;
    const toAccount = newTransaction.ToAccount;
    const amount = newTransaction.Amount;

    sql.query(
      `UPDATE Account SET Balance = Balance - ? WHERE AccountID = ?`,
      [amount, fromAccount],
      (err, res) => {
        if (err) {
          console.log('error: ', err);
          result({ kind: 'error', ...err }, null);
          return;
        }
      }
    );

    result({ kind: 'success' }, newTransaction);
  });
};

// SQL query to get a transaction by ID
Transaction.findById = (id, result) => {
  sql.query(
    'SELECT * FROM Transaction WHERE TransactionID = ?',
    id,
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result({ kind: 'error', ...err }, null);
        return;
      }

      if (res.length) {
        console.log('found transaction: ', res[0]);
        result({ kind: 'success' }, getTransaction(res[0]));
      } else {
        result({ kind: 'not_found' }, null);
      }
    }
  );
};

// get balance of an account
function getBalance(accountID, result) {
  const query = `SELECT Balance FROM Account WHERE AccountID = ?`;
  sql.query(query, accountID, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result({ kind: 'error', ...err }, null);
      return;
    }

    if (res.length) {
      console.log('found balance: ', res[0].Balance);
      result({ kind: 'success' }, res[0].Balance);
    } else {
      result({ kind: 'not_found' }, null);
    }
  });
}

module.exports = Transaction;
