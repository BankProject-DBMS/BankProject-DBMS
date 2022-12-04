const CustomerModel = require('../models/customer.model');

exports.findAll = (req, res) => {
  console.log(req.body);
  const name = req.body.name;
  CustomerModel.getAll(name, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving customers.',
      });
    else res.send(data);
  });
};

exports.createCustomer = (req, res) => {
  console.log(req.body);
  const customer = req.body.customer;
  CustomerModel.create(customer, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while creating customers.',
      });
    else res.send(data);
  });
};
