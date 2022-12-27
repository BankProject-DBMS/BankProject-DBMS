const sql = require('./db.js');

const fixedDeposit = function (fd) {
  this.SavingsAccountID = fd.savings;
  this.TypeID = fdTypes[fd.type];
  this.Amount = fd.amount;
};

fixedDeposit.create = (newFd, result) => {
  const fdTypes = { 6: 'F061300', 12: 'F121450', 36: 'F361500' };
  const fixedD = {
    SavingsAccountID: newFd.savings,
    TypeID: fdTypes[newFd.type],
    Amount: newFd.amount,
  };

  sql.query('INSERT INTO fdaccount SET ?', fixedD, (err, res) => {
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
module.exports = fixedDeposit;
