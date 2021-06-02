const Customer = require("../models/customer.js");

const Deposit = require("../models/Deposit.js");



// Retrieve all Customers from the database.
exports.findAll = (req, res) => {

    Customer.getAll((err, data) => {
        if (err)
            res.status(500).send({
                ResponseCode: 500,
                ResponseMessage: "faield",
                message: err.message || "Some error occurred while retrieving customers."
            });
        else res.send(data);
    });
};

// Retrieve One Customer from the database
exports.findOne = (req, res) => {
    Customer.findById(req.params.customerId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    ResponseCode: 404,
                    ResponseMessage: `Not found Customer with id ${req.params.customerId}.`
                });
            } else {
                res.status(500).send({
                    ResponseCode: 500,
                    ResponseMessage: "Error retrieving Customer with id " + req.params.customerId
                });
            }
        } else res.send({ ResponseCode: 200, ResponseMessage: "SUCCESS", data });
    });
};

// Get number of customers in the system
exports.getAllByNumber = (req, res) => {
    Customer.findByNumber((err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({

                    message: "Not found Customers!"
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Customers "
                });
            }
        } else res.send(data);
    });
};

// deposti amount into customer account
exports.deposit = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Deposit fields
    const deposit = new Deposit({
        sender_id: "1", // 1 it's default of bulsho ewallet account 
        transaction_amount: req.body.transaction_amount,
        receiver_id: req.body.receiver_id,
        created_at: req.body.created_at,
        updated_at: req.body.updated_at
    });

    // Save Deposit in the database
    Deposit.create(deposit, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Customer."
            });
        else res.status(200).send(data);
    });
};