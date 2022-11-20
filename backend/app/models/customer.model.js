const sql = require("./db.js");


const Customer = function (customer) {
    this.name = customer.name;
    this.dateOfBirth = customer.dateOfBirth;
    this.address = customer.address;
    this.phone = customer.phone;
    this.occupation = customer.occupation;
}

Customer.getAll = (name, result) => {

    let query = "SELECT * FROM customer"

    if (name) {
        query += ` WHERE name LIKE '%${name}%'`;
    }

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Customers: ", res);
        result(null, res);
    });


}

Customer.findById = (id, result) => {

    sql.query("SELECT * FROM customer WHERE customerID = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found tutorial: ", res[0]);
            result(null, res[0]);
            return;
        }
    })


}

module.exports = Customer;