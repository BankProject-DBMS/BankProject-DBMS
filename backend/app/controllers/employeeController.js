const employees = require('../models/employee.model');

exports.getAll = (req, res) => {
  const employeeName = req.body.employeeName;
  employees.getAll(employeeName, (err, data) => {
    if (err.kind === 'error') {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving employees.',
      });
    }
    res.send(data);
  });
};

exports.getFromID = (req, res) => {
  const employeeID = req.params.id;
  employees.findById(employeeID, (err, data) => {
    if (err.kind === 'not_found') {
      res.status(404).send({
        message: `No employee found with id ${employeeID}.`,
      });
    } else if (err.kind != 'success') {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving employee.',
      });
    } else res.send(data);
  });
};

exports.create = (req, res) => {
  const newEmployee = {
    Name: req.body.name,
    Position: req.body.position,
    BranchID: req.body.branchID,
    OnlineID: req.body.onlineID,
    Password: req.body.password,
  };
  employees.createEmployee(newEmployee, (err, data) => {
    if (err.kind != 'success') {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving employee.',
      });
    } else res.send(data);
  });
};
