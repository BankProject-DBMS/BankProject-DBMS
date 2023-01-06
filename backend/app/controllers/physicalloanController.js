const PhysLoanModel = require('../models/physloan.model');

//
exports.getCustomerPhysicalLoans = (req, res) => {
  const customerID = req.user.CustomerID;
  PhysLoanModel.getAll(customerID, (err, data) => {
    if (err.kind === 'not_found') {
      res.status(404).send({
        message: `No physical loans found for customer ${customerID}.`,
      });
    } else if (err.kind != 'success') {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving accounts.',
      });
    } else res.send(data);
  });
};
