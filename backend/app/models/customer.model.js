const sql = require('./db.js');

const Customer = function (customer) {
  this.name = customer.name;
  this.dateOfBirth = customer.dateOfBirth;
  this.Address = customer.Address;
  this.Phone = customer.Phone;
  this.occupation = customer.occupation;
};

Customer.getAll = (name, req, result) => {
  let query = 'SELECT * FROM Customer';
  if (req.user.role === 'customer') {
    console.log('no access cust getall');
    result({ kind: 'access denied' }, null);
    return;
  }

  if (name) {
    query += ` WHERE name LIKE ${sql.escape(`%${name}%`)}`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    // console.log('Customers: ', res);
    result(null, res);
    return;
  });
};

Customer.findById = (id, req, result) => {
  if (req.user.role === 'customer') {
    console.log('no access cust findbyid');
    result({ kind: 'access denied' }, null);
    return;
  }
  sql.query('SELECT * FROM Customer WHERE customerID = ?', id, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log('found customer: ', res[0]);
      result(null, res[0]);
      return;
    }
  });
};

Customer.create = (newCustomer, req, result) => {
  if (req.user.role === 'customer') {
    console.log('no access cust create');
    result({ kind: 'access denied' }, null);
    return;
  }
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

Customer.remove = (id, req, result) => {
  if (req.user.role === 'customer') {
    console.log('no access cust remove');
    result({ kind: 'access denied' }, null);
    return;
  }
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

Customer.updateById = (id, req, customer, result) => {
  console.log({ customer, id });
  if (req.user.role === 'customer') {
    console.log('no access cust update by id');
    result({ kind: 'access denied' }, null);
    return;
  }
  sql.query(
    'UPDATE Customer SET Name = ?, dateOfBirth = ?, Address = ?, Phone = ?, occupation = ? WHERE CustomerID = ?',
    [
      customer.Name,
      customer.dateofbirth,
      customer.Address,
      customer.Phone,
      customer.occupation,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: 'not_found' }, null);
        return;
      }

      console.log('Updated customer: ', { id: id, ...customer });
      result(null, { id: id, ...customer });
    }
  );
};

module.exports = Customer;
