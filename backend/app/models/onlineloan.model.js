const sql = require('./db.js');

const onlineLoan = function (loan) {
  this.LoanID = loan.loanID;
  this.Amount = loan.amount;
  this.FDAccountID = loan.fdaccountID;
  this.TypeID = loan.typeID;
  this.SavingsAccountID = loan.savingsID;
};

//get all phyical loans for a given customer ID or get all online loans
onlineLoan.getAll = (customerID, result) => {
  console.log('in get all', customerID);
  let query = 'SELECT * from OnlineLoan';

  if (customerID) {
    query += ` WHERE CustomerID = ${sql.escape(customerID)}`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result({ kind: 'error', ...err }, null);
      return;
    }
    console.log(res);
    if (res.length) {
      console.log('found onlineLoans: ', res);
      result({ kind: 'success' }, res);
    } else {
      result({ kind: 'not_found' }, null);
    }
  });
};

onlineLoan.create = (newOnlineLoan, result) => {
  console.log('IN OL model', newOnlineLoan);

  if (newOnlineLoan.Amount > 500000) {
    result({ kind: 'Limit exceeded' }, null);
    return;
  }
  sql.query(
    'SELECT amount FROM FDAccount WHERE AccountID = ?',
    newOnlineLoan.FDAccountID,
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result({ kind: 'error', ...err }, null);
        return;
      }
      if (0.6 * res[0].amount < newOnlineLoan.Amount) {
        result({ kind: 'FD Amount is not sufficient' }, null);
        return;
      }
      sql.query(
        'call create_onlineloan_procedure (?,?,?,?,?,?, @code)',
        [
          newOnlineLoan.CustomerID,
          newOnlineLoan.SavingsAccountID,
          newOnlineLoan.Amount,
          newOnlineLoan.Duration,
          newOnlineLoan.FDAccountID,
          newOnlineLoan.InterestRate,
        ],

        (err, res) => {
          if (err) {
            console.log('error: ', err);
            result({ kind: 'error', ...err }, null);
            return;
          }

          console.log('created Online Loan: ', {
            id: res.insertId,
            ...newOnlineLoan,
          });
          result({ kind: 'success' }, { id: res.insertId, ...newOnlineLoan });
        }
      );
    }
  );
};

onlineLoan.getInstallmentsByAccountID = (accountID, req, result) => {
  sql.query(
    'SELECT * from OnlineLoanInstallment WHERE LoanID = ?',
    accountID,
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result({ kind: 'error', ...err }, null);
        return;
      }
      sql.query(
        'SELECT * from OnlineLoan WHERE LoanID = ?',
        accountID,
        (err, res1) => {
          if (res1.length) {
            console.log(res1);
            if (
              req.user.role === 'customer' &&
              !(req.user.CustomerID === res1[0].CustomerID)
            ) {
              console.log('no access online loan installments find by id');
              result({ kind: 'access denied' }, null);
              return;
            }

            console.log('found installments for account: ', res);
            result({ kind: 'success' }, res);
          } else {
            result({ kind: 'not_found' }, null);
          }
        }
      );
    }
  );
};

onlineLoan.getUnpaidOnlineInstallments = (result) => {
  const query = `select * from OnlineLoanInstallment where DeadlineDate < CURRENT_TIMESTAMP and Paid = false order by DeadlineDate`;
  sql.query(query, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result({ kind: 'error', ...err }, null);
      return;
    }

    if (res.length) {
      console.log('found unpaid installments: ', res);
      result({ kind: 'success' }, res);
    } else {
      result({ kind: 'not_found' }, null);
    }
  });
};

onlineLoan.getInstallmentByID = (installmentID, result) => {
  sql.query(
    'SELECT * from OnlineLoanInstallment WHERE InstallmentID = ?',
    installmentID,
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result({ kind: 'error' }, null);
        return;
      }

      if (res.length) {
        console.log('found installment: ', res);
        result({ kind: 'success' }, res[0]);
      } else {
        console.log('installment not found');
        result({ kind: 'not_found' }, null);
      }
    }
  );
};

onlineLoan.payInstallment = (installmentID, result) => {
  sql.query('CALL pay_onl_installment(?)', installmentID, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result({ kind: 'error' }, null);
      return;
    }

    if (res === 'ALREADY_PAID') {
      console.log('installment already paid');
      result({ kind: 'already_paid ' }, null);
    } else if (res === 'INSTALLMENT_NOT_FOUND') {
      console.log('installment not found');
      result({ kind: 'not_found' }, null);
    } else if (res === 'FAILED') {
      console.log('installment payment failed');
      result({ kind: 'failed' }, null);
    } else {
      console.log('installment paid');
      result({ kind: 'success' }, res);
    }
  });
};

module.exports = onlineLoan;
