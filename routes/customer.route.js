const customers = require("../controllers/customer.controller.js");
const deposit = require("../controllers/deposit.controller.js")
const express = require("express");
const router = express.Router();
var requireAuthentication = require('../auth/apiKey-Auth.js');

// rout to get all customer 
router.get("/customers", requireAuthentication, customers.findAll);

// rout to get one customer 
router.get("/customers/:customerId", requireAuthentication, customers.findOne);

// rout to get total customers
router.get("/allcustomers/", requireAuthentication, customers.getAllByNumber);

// rout to make deposit into cusotmer account
router.post("/deposit", requireAuthentication, deposit.addDeposit);

// rout to make deposit into cusotmer account
router.post("/withdraw", requireAuthentication, deposit.addWithdraw);

// go the not found page when the page is not excst
router.get('*', function(req, res) {
    res.status(404).send('notfound');
});

module.exports = router;