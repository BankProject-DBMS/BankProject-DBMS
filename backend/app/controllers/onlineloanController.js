const OnlineLoanModel = require('../models/onlineloan.model');

//
exports.getCustomerOnlineLoans = (req, res) => {
  const customerID = req.user.CustomerID;
  OnlineLoanModel.getAll(customerID, (err, data) => {
    if (err.kind === 'not_found') {
      res.status(404).send({
        message: `No online loans found for customer ${customerID}.`,
      });
    } else if (err.kind != 'success') {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving accounts.',
      });
    } else res.send(data);
  });
};
