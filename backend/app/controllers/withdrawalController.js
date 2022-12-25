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

exports.createWithdrawal = (req, res) => {
  console.log(req.body);
  const withdrawal = req.body.withdrawal;
  WithdrawalModel.create(withdrawal, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while creating withdrawal.',
      });
    else res.send(data);
  });
};
