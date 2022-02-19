const db = require("../db/connect.db")

exports.getAllEmployees = (req, res, next) => {
    // returns a list of ALL employees
    var sql = "select firstname as fname, lastname as lname, id as ID from Employee"
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

exports.getEmployeeById = (req, res, next) => { 
    // finds employee by  id
    const sql = "SELECT * FROM Employee WHERE id = ? "
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

exports.deleteEmployee =  (req, res, next) => {
    db.run(
        'DELETE FROM Employee WHERE id = ?',
        req.params.id,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message":"deleted", changes: this.changes})
    });
}