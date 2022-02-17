var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {

    console.log('I recreated the db again???', 'sqlite3')

    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err 
    }

    console.log('Connected to the SQLite database.')

    const setForeignKeys = "PRAGMA foreign_keys = OFF;"
    db.run(setForeignKeys,
        (err) => {
            if (err) console.log('DB is set Foreign Keys OFF');
            else console.warn('DB is set Foreign Keys ON');
        });

    // ---------------------------
    //  USERS
    // ---------------------------
    const userTable = `CREATE TABLE User (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        fullname CHAR(50), 
        username CHAR(50) UNIQUE,
        password CHAR(50), 
        num_actions INTEGER,
        CONSTRAINT username_unique UNIQUE (username)
        )`
    db.run(userTable,
    (err) => {
        if (err) {
            console.log('Table already created : user')
        } else {
            // Table just created, creating some rows
            var insert = 'INSERT INTO User (fullname, username, password,num_actions ) VALUES (?,?,?,?)'
            db.run(insert, ["admin istrator","admin",md5("admin123456"),0]) // 1
            db.run(insert, ["manager mng","manager",md5("mng123456"),0]) // 2
            db.run(insert, ["manager second","manager2",md5("mng123456")],0) //3
            db.run(insert, ["user1 name1","user1",md5("user123456"),0])
            db.run(insert, ["user2 name2","user2",md5("user123456"),0])
            db.run(insert, ["user3 name3","user3",md5("user123456"),0])
            db.run(insert, ["user4 name4","user4",md5("user123456"),0])
        }
    });

    // ---------------------------
    //  DEPARTMENT
    // ---------------------------
    const departmentTable = `CREATE TABLE Department (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name text, 
        manager,
        FOREIGN KEY(manager) REFERENCES Employee(id)
        )`
    db.run(departmentTable,
    (err) => {
        if (err) {
            console.log('Table already created : Department')
        }else{
            // Table just created, creating some rows
            console.log("Table created", departmentTable)
            var insert = 'INSERT INTO Department (name, manager) VALUES (?,?)'
            db.run(insert, ["department first",2]) // 1
            db.run(insert, ["department second",3]) // 2
        }
    });

    // ---------------------------
    //  EMPLOYEE
    // ---------------------------
    const employeeTable = `CREATE TABLE Employee (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstname CHAR(60), 
        lastname CHAR(60), 
        startworkyr INT,
        departmentID INT, 
        FOREIGN KEY(departmentID) REFERENCES Deparment(id)
        )`
    db.run(employeeTable,
    (err) => {
        if (err) {
            console.log('Table already created : Employee')
        }else{
            // Table just created, creating some rows
            console.log("Table created :", employeeTable)
            var insert = 'INSERT INTO Employee (firstname, lastname, startworkyr, departmentID ) VALUES (?,?,?,?)'
            db.run(insert, ["firstone", "lastone", 2020, 1 ])
            db.run(insert, ["firstsecond", "lastsecond", 2021, 1 ])
            db.run(insert, ["firstthird", "lastthird", 2021, 2 ])
            db.run(insert, ["firstfourth", "lastfourth", 2021, 1 ])
            db.run(insert, ["firstfifth", "lastfifth", 2021, 2 ])
        }
    });

    // ---------------------------
    //  SHIFT
    // ---------------------------
    const shiftTable = `CREATE TABLE Shift (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date DATETIME, 
        starttime INT,
        endtime INT
        )`
    db.run(shiftTable,
    (err) => {
        if (err) {
            console.log('Table already created : Shift')
        }else{
            // Table just created, creating some rows
            console.log("Table created: ", shiftTable)
            var insert = 'INSERT INTO Shift (date, starttime, endtime) VALUES (?,?,?)'
            db.run(insert, ['2022-01-01 8:00:00', '8:10:00', '18:00:00']) // 1
            db.run(insert, ['2022-01-01 18:00:00', '18:00:00', '8:00:00']) // 2
            db.run(insert, ['2022-01-02 8:00:00', '8:00:00', '18:00:00']) // 3
            db.run(insert, ['2022-01-02 18:00:00', '18:10:00', '8:00:00']) // 4 
        }
    });

    // ---------------------------
    //  EMPLOYEE SHIFT
    // ---------------------------
    const empShiftTable = `CREATE TABLE EmployeeShift (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        employeeID INT, 
        shiftID INT, 
        FOREIGN KEY(employeeID) REFERENCES Employee(id),
        FOREIGN KEY(shiftID) REFERENCES Shift(id)
        )`
    db.run(empShiftTable,
    (err) => {
        if (err) {
            console.log('Table already created : Employee Shift')
        }else{
            // Table just created, creating some rows
            console.log("Table created: ", empShiftTable)
            var insert = 'INSERT INTO EmployeeShift (employeeID, shiftID) VALUES (?,?)'
            db.run(insert, [1,1])
            db.run(insert, [2,2])
            db.run(insert, [1,3])
            db.run(insert, [2,4])
            
        }
    });
});

module.exports = db
