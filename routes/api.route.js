// =====================================================
//      API ENDPOINT Users
// =====================================================
const md5 = require("md5")
const express = require('express');
const router = express.Router();
const db = require("../db/database")


// api/
router.get('/', function(req, res){
   res.send('GET route on things.');
});
// api/
router.post('/', function(req, res){
   res.send('POST route on things.');
});

// api/auth
router.post("/auth", (req, res, next) => {
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
})


// ==============================================
//      USERS
// ==============================================
router.get("/users", (req, res, next) => {
    var sql = "select * from user"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message": "success",
            "data": rows
        })
    });
});

router.get("/user/:id", (req, res, next) => {
    var sql = "select * from user where id = ?"
    var params = [req.params.id]
    
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
});

router.post("/user/add", (req, res, next) => {
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
})

router.patch("/user/:id", (req, res, next) => {
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
})

router.delete("/user/:id", (req, res, next) => {
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
})

// ==============================================
//      EMPLOYEE
// ==============================================
router.get("/Employee", (req, res, next) => {
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
});

// ==============================================
//      SHIFT
// ==============================================
router.post("/shift/add", (req, res, next) => {
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
});

function reduceNumOfActions(userID) {
    db.run(
        `UPDATE User set 
        num_actions =(SELECT num_actions FROM User WHERE id = ?), 
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

//export this router to use in our index.js
module.exports = router;