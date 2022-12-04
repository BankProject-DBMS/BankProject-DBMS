const CustomerModel = require('../models/customer.model');

exports.findAll = (req, res) => {
  const name = req.query.name;
  console.log(req);
  CustomerModel.getAll(name, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving customers.',
      });
    else res.send(data);
  });
  // res.send({ test: 'test' });
};
