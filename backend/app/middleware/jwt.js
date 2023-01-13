const jwt = require('jsonwebtoken');
const onlineCustomerModel = require('../models/online.customer.model');
const onlineEmployeeModel = require('../models/employee.model');
// const _ = require("lodash");
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

let verifyToken = (token, next) => {
  console.log({ token });
  try {
    var decoded = jwt.verify(token, JWT_SECRET);
    return { ...decoded, expired: false };
  } catch (err) {
    if (err) {
      console.log(err);
      if (err.name === 'TokenExpiredError') {
        //console.log('token expired');
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
  console.log({ auth_header });
  if (auth_header) {
    try {
      const token = auth_header.split(' ')[1];
      req.token = token;
      const decodedToken = verifyToken(req.token, next);
      console.log({ decodedToken });

      if (!decodedToken) {
        res.status(400).json({
          status: 400,
          message: 'User does not have  token',
        });
      } else {
        if (decodedToken.role === 'customer') {
          console.log('is Customer');
          console.log(`params: ${req.params}`);

          if (decodedToken.expired) {
            let decoded = jwt.decode(token);
            //console.log(decoded.Username);
            const user = onlineCustomerModel.findByUsername(
              decoded.Username,
              (err, res) => {
                console.log('Result:');
                // console.log(res);
              }
            );
            console.log(user);
            user.token = jwt.sign(
              {
                user,
              },
              JWT_SECRET,
              {
                expiresIn: '15m', //change
              }
            );
            req.user = { user, role: decoded.role };
            next();
          } else {
            let decoded = jwt.decode(token);
            console.log('not expired');

            onlineCustomerModel.findByUsername(decoded.Username, (err, res) => {
              if (err) {
                console.log({ err });
              }
              let user = res;
              user.token = token;
              user.role = decoded.role;
              req.user = user;
              next();
            });

            console.log('user customer got in jwt authorization');

            // req.user = _.pick(user, models.User.returnable);
          }
        } else if (
          decodedToken.role === 'employee' ||
          decodedToken.role === 'manager'
        ) {
          console.log('is employee');
          console.log(`params: ${req.params}`);

          if (decodedToken.expired) {
            res.status(401).json({
              status: 400,
              message: 'Token Expired',
            });
          } else {
            let decoded = jwt.decode(token);
            console.log('not expired');

            onlineEmployeeModel.findByUsername(
              decoded.OnlineID,
              (err, response) => {
                if (err.kind !== 'success') {
                  res.status(400).json({
                    status: 400,
                    message: 'Error with your token',
                  });
                  return;
                }
                let user = response;
                user.token = token;
                user.role = decoded.role;
                req.user = user;
                next();
              }
            );

            console.log('user employee got in jwt authorization');

            // req.user = _.pick(user, models.User.returnable);
          }
        }
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
