const LoanModel = require('../models/loan.model');

exports.findAll = (req, res) => {
  console.log(req.body);
  const name = req.body.name;
  LoanModel.getAll(name, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving loans.',
      });
    else res.send(data);
  });
};

exports.createLoan = (req, res) => {
  console.log(req.body);
  const loan = req.body.loan;
  LoanModel.create(loan, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while creating loan.',
      });
    else res.send(data);
  });
};