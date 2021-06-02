const sql = require("./db.js");

// constructor
const Withdraw = function(withdraw) {
    this.sender_id = withdraw.sender_id;
    this.transaction_amount = withdraw.transaction_amount;
    this.receiver_id = withdraw.receiver_id;
    this.created_at = withdraw.created_at;
    this.updated_at = withdraw.updated_at;
}

Withdraw.create = (newDithdraw, result) => {
    sql.query("INSERT INTO transactions SET ?", newDithdraw, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created New Deposit: ", { id: res.insertId, ...newDithdraw });
        result(null, { id: res.insertId, ...newDithdraw, })
            // result(null, res.json = { data: [newDeposit], info: ["foo: bar", result.StatusCode] });;
    });
};




Withdraw.create = (newDithdraw, result) => {
    var is_exit = 1;
    let values = {
        user_id: newDithdraw.receiver_id,
        wallet: newDithdraw.transaction_amount,
        created_at: newDithdraw.created_at,
        updated_at: newDithdraw.updated_at
    }
    sql.query("SELECT wallet FROM user_wallets WHERE user_id = ?", [newDithdraw.sender_id],
        (err, res) => {
            if (res.length == 0 || res[0].wallet <= 0 || res[0].wallet < newDithdraw.transaction_amount) {
                result({ Cust_id: newDithdraw.sender_id, error: "insufficient Balance" }, null);
                return;

            } else {
                sql.query("INSERT INTO transactions SET ? ", newDithdraw, (err, res) => {
                    if (err) {
                        console.log("error: ", err);
                        result(err, null);
                        return;
                    }
                    console.log("created New Withdraw: ", { id: res.insertId, ...newDithdraw });
                    result(null, { id: res.insertId, ...newDithdraw, })
                });
                sql.query(
                    "UPDATE user_wallets SET wallet = wallet - ?, updated_at = ? WHERE user_id = ?", [newDithdraw.transaction_amount, newDithdraw.updated_at, newDithdraw.sender_id],
                    (err, res) => {
                        if (err) {
                            console.log("error: ", err);
                            result(null, err);
                            return;
                        }
                        //console.log("updated customer: ");
                        result(null, newDithdraw);
                    });

            }
        });

};

module.exports = Withdraw;