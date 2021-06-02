const sql = require("./db.js");

// constructor
const Customer = function(customer) {
    this.email = customer.email;
    this.name = customer.name;
    this.status = customer.active;
};

Customer.getAll = result => {
    sql.query("SELECT name,email,mobile_number,status,created_at FROM users where is_vendor = 0", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("customers: ", res);
        result(null, res);
    });
};

Customer.findById = (customerId, result) => {
    sql.query(`SELECT name,email,mobile_number,status,created_at FROM users WHERE mobile_number = ${customerId} and is_vendor = 0`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found customer: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Customer with the id
        result({ kind: "not_found" }, null);
    });
};

Customer.findByNumber = result => {
    sql.query("SELECT count(*)TotalCustomers FROM users", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("customers: ", res);
        result(null, res);
    });
}


module.exports = Customer;