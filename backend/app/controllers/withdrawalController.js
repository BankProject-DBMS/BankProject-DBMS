const WithdrawalModel = require('../models/withdrawal.model');

exports.findAll = (req, res) => {
  console.log(req.body);
  WithdrawalModel.getAll(null, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving withdrawals.',
      });
    else res.send(data);
  });
};

exports.findByAccountID = (req, res) => {
  //console.log(req.body);
  const id = req.params.AccountID;
  WithdrawalModel.findByAccountId(id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving withdrawals.',
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
  const withdrawal = {
    accountID: req.body.withdrawal.accountID,
    amount: req.body.withdrawal.amount,
    remark: req.body.withdrawal.remark,
  };

  WithdrawalModel.create(withdrawal, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating withdrawal.',
      });
    } else {
      console.log(data);
      res.send(data);
    }
  });
};
