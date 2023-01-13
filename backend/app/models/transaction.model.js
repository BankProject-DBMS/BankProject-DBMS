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
  const toAccount = newTransaction.FromAccount;
  const fromAccount = newTransaction.ToAccount;
  const amount = newTransaction.Amount;
  const remark = newTransaction.Remark;
  const query = 'CALL transfers_procedure(?, ?, ?, ?, @code)';
  sql.query(query, [toAccount, fromAccount, amount, remark], (err, res) => {
    if (err) {
      console.log('error: ', err);
      result({ kind: 'error', ...err }, null);
      return;
    }
    console.log('res: ', res);
    console.log('created transaction: ', { ...newTransaction });
    result({ kind: 'success' }, { ...newTransaction });
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

Transaction.getAll = (transactionID, result) => {
  let query1 = 'SELECT * FROM Transaction';

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

Transaction.getBranchInReport = (branchID, result) => {
  const query = `select * from Transaction t left join CashAccount ct on ct.AccountID = t.ToAccount WHERE ct.BranchID = ?;`;
  sql.query(query, branchID, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result({ kind: 'error' }, null);
      return;
    }

    result({ kind: 'success' }, res);
    return;
  });
};

Transaction.getBranchOutReport = (branchID, result) => {
  const query = `select * from Transaction t left join CashAccount ca on ca.AccountID = t.FromAccount WHERE ca.BranchID = ?`;
  sql.query(query, branchID, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result({ kind: 'error' }, null);
      return;
    }

    result({ kind: 'success' }, res);
    return;
  });
};

Transaction.getBranchInCount = (branchID, result) => {
  const query = `select count(*) as count from Transaction t left join CashAccount ct on ct.AccountID = t.ToAccount WHERE ct.BranchID = ?;`;
  sql.query(query, branchID, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result({ kind: 'error' }, null);
      return;
    }

    result({ kind: 'success' }, res[0]);
    return;
  });
};

Transaction.getBranchOutCount = (branchID, result) => {
  const query = `select count(*) as count from Transaction t left join CashAccount ca on ca.AccountID = t.FromAccount WHERE ca.BranchID = ?`;
  sql.query(query, branchID, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result({ kind: 'error' }, null);
      return;
    }

    result({ kind: 'success' }, res[0]);
    return;
  });
};

module.exports = Transaction;
