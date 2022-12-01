const Customer = require("./app/models/customer.model");

Customer.getAll("Inuka", (err, data) => {
    if (err) {
        console.log("Error");
    }
    else {
        console.log(data);
    }
    return;
})