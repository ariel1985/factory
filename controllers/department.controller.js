/**
 * User controller - connects between db and routs
 * https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes/mvc_express.png
 * 
 */
const db = require("../db/connect.db")

exports.getAllDepartments = (req, res, next) => {
    // returns a list of ALL employees
    var sql = "SELECT * FROM Department"
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

exports.getDepartmentById = (req, res, next) => { 
    // finds department by employee id
    const sql = "SELECT * FROM Department WHERE id = ? "
    db.all(sql, [req.params.id], (err, rows) => {
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
