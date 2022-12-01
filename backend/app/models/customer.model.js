const sql = require('./db.js');

const Customer = function (customer) {
  this.name = customer.name;
  this.dateOfBirth = customer.dateOfBirth;
  this.Address = customer.Address;
  this.Phone = customer.Phone;
  this.occupation = customer.occupation;
};

Customer.getAll = (name, result) => {
  let query = 'SELECT * FROM Customer';

  if (name) {
    query += ` WHERE name LIKE '%${sql.escape(name)}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    // console.log('Customers: ', res);
    result(null, res);
    return;
  });
};

Customer.findById = (id, result) => {
  sql.query('SELECT * FROM customer WHERE customerID = ?', id, (err, res) => {
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

Customer.create = (newCustomer, result) => {
  sql.query('INSERT INTO Customer SET ?', newCustomer, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    console.log('Created Customer:', newCustomer);
    result(null, newCustomer);
  });
};

Customer.remove = (id, result) => {
  sql.query('DELETE FROM Customer WHERE CustomerID = ?', id, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    console.log(`Deleted customer with id: ${id}`);
  });
};

Customer.removeAll = (result) => {
  sql.query('DELETE FROM Customer', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    console.log(`Deleted ${res.affectedRows} customers`);
    result(null, res);
  });
};

module.exports = Customer;
