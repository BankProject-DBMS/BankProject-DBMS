const FDModel = require('../models/fd.model');

exports.createFD = (req, res) => {
  // TODO check whether savings account exists before creating FD
  console.log(req.body);
  const fd = req.body.fd;
  FDModel.create(fd, req, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while creating customers.',
      });
    else res.send(data);
  });
};

//
exports.getCustomerFD = (req, res) => {
  const customerID = req.user.CustomerID;
  FDModel.getAll(customerID, req, (err, data) => {
    if (err.kind === 'not_found') {
      res.status(404).send({
        message: `No fixed deposits found for customer ${customerID}.`,
      });
    } else if (err.kind != 'success') {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving accounts.',
      });
    } else res.send(data);
  });
};

// Retrieve an account by ID
exports.getFromID = (req, res) => {
  console.log('udara', req.params, req.user, req.body);
  const accountID = req.params.id;
  FDModel.findById(accountID, req, (err, data) => {
    if (err.kind === 'not_found') {
      res.status(404).send({
        message: `No account found with id ${accountID}.`,
      });
    } else if (err.kind != 'success') {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving account.',
      });
    } else if (err.kind === 'access denied') {
      res.status(401).send({
        message: err.message || 'Access Denied to Page',
      });
    } else res.send(data);
  });
};
