const sql = require("./db.js");

// constructor
const Deposit = function(deposit) {
    this.sender_id = deposit.sender_id;
    this.transaction_amount = deposit.transaction_amount;
    this.receiver_id = deposit.receiver_id;
    this.created_at = deposit.created_at;
    this.updated_at = deposit.updated_at;
}

const User_wallets = function(user_wallets) {
    this.user_id = user_wallets.user_id;
    this.wallet = user_wallets.wallet;
    this.created_at = user_wallets.created_at;
    this.updated_at = user_wallets.updated_at;
}

Deposit.create = (newUpdate, result) => {
    var is_exit = 1;
    let values = {
        user_id: newUpdate.receiver_id,
        wallet: newUpdate.transaction_amount,
        created_at: newUpdate.created_at,
        updated_at: newUpdate.updated_at
    }
    sql.query("SELECT * FROM user_wallets WHERE user_id = ?", [newUpdate.receiver_id],
        (err, res) => {
            if (res.length == 0) {
                sql.query("INSERT INTO transactions SET ? ", newUpdate, (err, res) => {
                    if (err) {
                        console.log("error: ", err);
                        result(err, null);
                        return;
                    }
                    console.log("created New Deposit: ", { id: res.insertId, ...newUpdate });
                    result(null, { id: res.insertId, ...newUpdate, })
                });
                sql.query("INSERT INTO user_wallets SET ? ", values, (err, res) => {
                    if (err) {
                        console.log("error: ", err);
                        result(err, null);
                        return;
                    } else {
                        // result(null)
                    }
                });


            } else {
                sql.query("INSERT INTO transactions SET ? ", newUpdate, (err, res) => {
                    if (err) {
                        console.log("error: ", err);
                        result(err, null);
                        return;
                    }
                    console.log("created New Deposit: ", { id: res.insertId, ...newUpdate });
                    result(null, { id: res.insertId, ...newUpdate, })
                });
                sql.query(
                    "UPDATE user_wallets SET wallet = wallet + ?, updated_at = ? WHERE user_id = ?", [newUpdate.transaction_amount, newUpdate.updated_at, newUpdate.receiver_id],
                    (err, res) => {
                        if (err) {
                            console.log("error: ", err);
                            result(null, err);
                            return;
                        }
                        console.log("updated customer: ");
                        //result(null);
                    }
                );

            }
        }

    )


};


module.exports = Deposit;