const db = require("../db/connect.db")

exports.getAllShifts = (req, res, next) => {
    // returns a list of ALL shifts
    const sql = "select * from Shift"
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

exports.getShiftById = (req, res, next) => { 
    const sql = "SELECT * FROM Shift WHERE id = ? "
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

exports.getEmpShiftByShiftId = (req, res, next) => { 
    const sql = "SELECT * FROM EmployeeShift WHERE shiftID = ? "
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


exports.addShift = (req, res, next) => {
    // given empid and shift details it will add it.
    const sql = `INSERT INTO Shift (date, starttime, endtime) VALUES (?,?,?)`
    var params = [req.body.dateOfShift, req.body.startTime, req.body.endTime] 
    // https://github.com/mapbox/node-sqlite3/issues/962
    db.run(sql, params, function (err) {
        if (err) {
            console.warn('SQL run error', err);
            res.status(400).json({"error":err.message});
            return;
        }
        console.log('row id added', this.lastID)
        const shiftID = this.lastID
        if (shiftID > 0) {
            // add employee shift
            var sql ='INSERT INTO EmployeeShift (employeeID, shiftID) VALUES (?,?)'
            var params2 =[req.body.employeeID, shiftID]
            db.run(sql, params2, function (err) {
                if (err){
                    res.status(400).json({"error": err.message})
                    return;
                }
                res.json({
                    "message": "success",
                    "data": [params, params2],
                    "id" : this.lastID
                })
                reduceNumOfActions(req.body.employeeID)
            });
        }
    });
}
