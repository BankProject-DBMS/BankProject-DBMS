const CustomerModel = require('../models/customer.model');

exports.findAll = (req, res) => {
  console.log(req.body);
  const name = req.body.name;
  CustomerModel.getAll(name, req, (err, data) => {
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
  CustomerModel.create(customer, req, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while creating customers.',
      });
    else res.send(data);
  });
};

exports.getFromID = (req, res) => {
  console.log(body);
  const id = req.body.id;
  CustomerModel.findById(id, req, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving customer.',
      });
    else res.send(data);
  });
};

exports.updateCustomer = (req, res) => {
  console.log(req.body, req.params);
  const id = req.params.id;
  const customer = req.body.customer;
  CustomerModel.updateById(id, req, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while updating customer.',
      });
    else res.send(data);
  });
};
