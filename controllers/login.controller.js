const db = require("../db/connect.db")

exports.authenticate = (req, res, next) => {
    let errors=[]
    if (!req.body.password){
        errors.push("No password specified");
    }
    if (!req.body.username){
        errors.push("No username specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        console.log("no username or password")
        return;
    }
    const data = {
        username: req.body.username,
        password : md5(req.body.password)
    }
    const sql = "SELECT * FROM User WHERE username = ? AND password = ?"
    const params = [data.username, data.password]
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message": "success",
            "data": row,
            "params": params
        })
    });
}
