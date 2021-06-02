const Deposit = require("../models/Deposit.js");
const User_wallets = require("../models/Deposit.js");
const Withdraw = require("../models/withdraw.js");

// deposti amount into customer account
exports.addDeposit = (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            ResponseCode: 400,
            ResponseMessage: "Body Content can not be empty!"
        });
    }
    if (req.body.receiver_id === "1") {
        return res.status(400).send({
            ResponseCode: 400,
            ResponseMessage: "The Receiver not found please try again!"
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

    // Create a Deposit fields
    const user_wallets = new User_wallets({
        transaction_amount: req.body.transaction_amount,
        receiver_id: req.body.receiver_id,
        updated_at: req.body.updated_at
    });

    // Save Deposit in the database
    Deposit.create(deposit, (err, data) => {
        if (err)
            return res.status(500).send({
                ResponseCode: 500,
                ResponseMessage: err.message || "Some error occurred while creating the new deposit."
            });
        else res.status(200).send({
            ResponseCode: 200,
            ResponseMessage: "SUCCESS",
            data
        });
    });
};

// withdraw amount into customer account
exports.addWithdraw = (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            ResponseCode: 400,
            ResponseMessage: "Body Content can not be empty!"
        });
    }
    if (req.body.sender_id === "1") {
        return res.status(400).send({
            ResponseCode: 400,
            ResponseMessage: "The Sender not found please try again!"
        });
    }
    // Create a Withdraw fields
    const withdraw = new Withdraw({
        sender_id: req.body.sender_id, // 1 it's default of bulsho ewallet account 
        transaction_amount: req.body.transaction_amount,
        receiver_id: "1",
        created_at: req.body.created_at,
        updated_at: req.body.updated_at
    });

    // Save Deposit in the database
    Withdraw.create(withdraw, (err, data) => {

        if (err) {
            if (err.error) {
                return res.status(201).send({
                    ResponseCode: 201,
                    ResponseMessage: "insufficient Balance"
                });
            }
            return res.status(500).send({
                ResponseCode: 500,
                ResponseMessage: err.message || "Some error occurred while Withdrawing the Customer account."
            });

        } else {
            res.status(200).send({
                ResponseCode: 200,
                ResponseMessage: "SUCCESS",
                data
            });
        }
    });
};