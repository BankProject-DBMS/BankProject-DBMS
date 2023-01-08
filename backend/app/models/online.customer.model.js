const sql = require('./db.js');

const OnlineCustomer = function (onlineCustomer) {
  this.CustomerID = onlineCustomer.customerID;
  this.Username = onlineCustomer.username;
  this.Password = onlineCustomer.password;
};

OnlineCustomer.create = (newOnlineCustomer, result) => {
  console.log('in create ', newOnlineCustomer);
  const query = `INSERT INTO OnlineCustomer SET ?`;
  sql.query(query, newOnlineCustomer, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result({ kind: 'error', ...err }, null);
      return;
    }

    console.log('created online customer: ', { ...newOnlineCustomer });
    result({ kind: 'success ' }, { ...newOnlineCustomer });
  });
};

OnlineCustomer.findByUsername = (username, result) => {
  console.log('in findUser');
  const query = `SELECT * FROM OnlineCustomer WHERE Username = ?`;

  sql.query(query, username, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result({ kind: 'error', ...err }, null);
      return;
    }

    if (res.length) {
      console.log(query);
      console.log('found online customer: ', res[0]);
      result({ kind: 'success' }, res[0]);
    } else {
      result({ kind: 'not_found' }, null);
    }
  });
};

OnlineCustomer.delete = (id, result) => {
  const query = `DELETE FROM OnlineCustomer WHERE CustomerID = ?`;
  sql.query(query, id, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result({ kind: 'error', ...err }, null);
      return;
    }

    if (res.affectedRows === 0) {
      result({ kind: 'not_found' }, null);
      return;
    }

    console.log('deleted online customer with id: ', id);
    result({ kind: 'success' }, res);
  });
};

module.exports = OnlineCustomer;
