/**
 * User controller - connects between db and routs
 * https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes/mvc_express.png
 * 
 */
const db = require("../db/connect.db")

exports.getAllUsers = (req, res, next) => {
    const sql = "SELECT * FROM user"
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
        return;
        }
        res.json({
            "message": "success",
            "data": rows
        })
    });
}

exports.getUserById = (req, res) => {
    const sql = "SELECT * FROM user WHERE id = ?"
    const params = [req.params.id]
    
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message": "success",
            "data": row,
            "id": params
        })
    });
}

exports.getUserActions = (req, res) => {
    const sql = "SELECT num_actions FROM user WHERE id = ?"
    const params = [req.params.id]
    
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message": "success",
            "data": row,
            "id": params
        })
    });
}

exports.addUser =  (req, res, next) => {
    const errors=[]
    if (!req.body.password){
        errors.push("No password specified");
    }
    if (!req.body.username){
        errors.push("No username specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    var data = {
        username: req.body.username,
        password : md5(req.body.password)
    }
    var sql ='INSERT INTO user (name, email, password) VALUES (?,?,?)'
    var params =[data.name, data.email, data.password]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
}

exports.updateUser = (req, res, next) => {
    const data = {
        name: req.body.name,
        email: req.body.email,
        password : req.body.password ? md5(req.body.password) : null
    }
    db.run(
        `UPDATE user set 
           name = COALESCE(?,name), 
           email = COALESCE(?,email), 
           password = COALESCE(?,password) 
           WHERE id = ?`,
        [data.name, data.email, data.password, req.params.id],
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({
                message: "success",
                data: data,
                changes: this.changes
            })
    });
}

exports.deleteUser =  (req, res, next) => {
    db.run(
        'DELETE FROM user WHERE id = ?',
        req.params.id,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message":"deleted", changes: this.changes})
    });
}


function reduceNumOfActions(userID) {
    db.run(
        `UPDATE User set 
        num_actions = (SELECT num_actions FROM User WHERE id = ?) + 1, 
        WHERE id = ?`,
        [empID],
        function (err) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({
                message: "success",
                data: empID,
                changes: this.changes
            })
    });
}