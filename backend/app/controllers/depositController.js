const DepositModel = require('../models/deposit.model');

exports.findAll = (req, res) => {
  console.log(req.body);
  DepositModel.getAll(null, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving deposites.',
      });
    else res.send(data);
  });
};

exports.findByAccountID = (req, res) => {
  console.log(req.body);
  const id = req.params.AccountID;
  DepositModel.findByAccountId(id, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving deposit.',
      });
    else res.send(data);
  });
};

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Invalid Content!',
    });
  }
  console.log(req.body);
  const deposit = {
    accountID: req.body.deposit.accountID,
    amount: req.body.deposit.amount,
    remark: req.body.deposit.remark,
  };

  DepositModel.create(deposit, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating deposit.',
      });
    } else res.send(data);
  });
};
