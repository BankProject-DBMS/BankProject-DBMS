const sql = require('./db.js');

const fdTypes = {}
const fixedDeposit = function (fd) {
    this.savings = fd.savings;
    this.type = fd.type;
    this.amount = fd.amount;
};

Fd.create = (newFd, result) => {
    sql.query('INSERT INTO Customer SET ?', newFd, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }

        console.log('Created Customer:', newCustomer);
        result(null, newCustomer);
    });
};