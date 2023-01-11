const sql = require('./db.js');

const Employee = function (employee) {
  this.EmployeeID = employee.employeeID;
  this.Name = employee.name;
  this.Position = employee.position;
  this.BranchID = employee.branchID;
  this.isManager = employee.isManager;
  this.OnlineID = employee.onlineID;
  this.Password = employee.password;
};

Employee.getAll = (name, result) => {
  let query = 'SELECT EmployeeID, Name, Position, BranchID FROM Employee';

  if (name) {
    query += ` WHERE Name LIKE ${sql.escape(`%${name}%`)}`;
  }
  else {
    query += ` WHERE isManager = 0`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result({ kind: 'error', err }, null);
      return;
    }

    // console.log('Employees: ', res);
    result({ kind: 'success' }, res);
    return;
  });
};

Employee.findById = (id, result) => {
  sql.query('SELECT * FROM Employee WHERE EmployeeID = ?', id, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result({ kind: 'error', err }, null);
      return;
    }

    if (res.length) {
      console.log('found employee: ', res[0]);
      result({ kind: 'success' }, res[0]);
      return;
    }

    // not found Employee with the id
    result({ kind: 'not_found' }, null);
    return;
  });
};

Employee.findByUsername = (userName, result) => {
  console.log('in employee model');
  console.log(userName);

  sql.query(
    'SELECT * FROM Employee WHERE OnlineID = ?',
    userName,
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result({ kind: 'error', err }, null);
        return;
      }

      if (res.length) {
        console.log('found employee: ', res[0]);
        result({ kind: 'success' }, res[0]);
        return;
      }

      // not found Employee with the id
      result({ kind: 'not_found' }, null);
      return;
    }
  );
};

Employee.createEmployee = (newEmployee, result) => {

  const bcrypt = require('bcrypt');
  const saltRounds = 10;
  console.log('in create ', newEmployee);
  const query = `INSERT INTO Employee SET ?`;

  bcrypt.hash(newEmployee.Password, saltRounds, function(err, hash){

    if (err) {
      console.log('error: ', err);
      result({ kind: 'error', err }, null);
      return;
    }

    newEmployee.Password = hash;
    sql.query(query, newEmployee, (err, res) => {
      if (err) {
        console.log('error: ', err);
        result({ kind: 'error', err }, null);
        return;
      }
      console.log('created employee: ', newEmployee);
      result({ kind: 'success' }, newEmployee);
    });
  });
  };

module.exports = Employee;
