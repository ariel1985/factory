const express = require('express');
const router = express.Router();
// controllers
const cUsers = require("../controllers/user.controller")
const cEmployees = require("../controllers/employee.controller")
const cDepartment = require("../controllers/department.controller")
const cShifts = require("../controllers/shift.controller")
const cLogin = require("../controllers/login.controller")

// api/
router.get('/', function(req, res){
   res.send('GET Success');
});
// api/
router.post('/', function(req, res){
   res.send('POST Success.');
});

// api/auth
router.post("/authenticate", cLogin.authenticate) 

// ==============================================
//      USERS
// ==============================================
router.get("/users", cUsers.getAllUsers);

router.get("/user/:id", cUsers.getUserById);

router.get("/action/:id", cUsers.getUserActions);

router.post("/user/add",cUsers.addUser)

router.patch("/user/:id", cUsers.updateUser)

router.delete("/user/:id", cUsers.deleteUser)

// ==============================================
//      EMPLOYEE
// ==============================================
router.get("/employees", cEmployees.getAllEmployees);

router.get("/employee/:id", cEmployees.getEmployeeById);

router.delete("/employee/:id", cEmployees.deleteEmployee)

// ==============================================
//      DEPARTMENT
// ==============================================
router.get("/departments", cDepartment.getAllDepartments);

router.get("/department/:id", cDepartment.getDepartmentById);

// ==============================================
//      SHIFT
// ==============================================
router.get("/shifts", cShifts.getAllShifts);

router.get("/empShifts/:id", cShifts.getEmpShiftByShiftId);

router.get("/shift/:id", cShifts.getShiftById);

router.post("/shift/add", cShifts.addShift);


//export this router to use in our index.js
module.exports = router;