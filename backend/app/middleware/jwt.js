const jwt = require('jsonwebtoken');
const onlineCustomerModel = require('../models/online.customer.model');
// const _ = require("lodash");
const { JWT_SECRET } = require('../config/db.config');

let verifyToken = (token, next) => {
  try {
    var decoded = jwt.verify(token, JWT_SECRET);
    return { ...decoded, expired: false };
  } catch (err) {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        var decoded = jwt.decode(token);
        if (decoded) {
          return { ...decoded, expired: true };
        } else return false;
      } else return false;
    }
  }
};

let tokenValidation = async (req, res, next) => {
  console.log('in token validation');
  const auth_header = req.headers['authorization'];
  if (auth_header) {
    try {
      const token = auth_header.split(' ')[1];
      req.token = token;
      const decodedToken = verifyToken(req.token, next);
      console.log({ decodedToken });
      console.log(decodedToken);
      if (!decodedToken) {
        res.status(400).json({
          status: 400,
          message: 'User does not have  token',
        });
      } else if (decodedToken.expired) {
        let decoded = jwt.decode(token);
        console.log(decoded);
        const user = onlineCustomerModel.findByUsername(
          decoded.userName,
          (err, res) => {}
        );

        user.token = jwt.sign(
          {
            user,
          },
          JWT_SECRET,
          {
            expiresIn: '20s', //change
          }
        );
        req.user = { user, role: decoded.role };
        next();
      } else {
        let decoded = jwt.decode(token);
        console.log('not expired');

        onlineCustomerModel.findByUsername(decoded.userName, (err, res) => {
          if (err) {
            console.log({ err });
          }
          let user = res;
          user.token = token;
          req.user = user;
          next();
        });
        console.log('user got in jwt authorization');

        // req.user = _.pick(user, models.User.returnable);
      }
    } catch (err) {
      console.log({ err });
      res.status(400).json({
        status: 400,
        message: 'Error with your token',
      });
    }
  } else {
    res.status(400).json({
      status: 400,
      message: 'User does not have  token',
    });
  }
};

module.exports.jwtauth = tokenValidation;
