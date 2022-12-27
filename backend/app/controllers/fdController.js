const FDModel = require('../models/fd.model');

exports.createFD = (req, res) => {
  // TODO check whether savings account exists before creating FD
  console.log(req.body);
  const fd = req.body.fd;
  FDModel.create(fd, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while creating customers.',
      });
    else res.send(data);
  });
};
