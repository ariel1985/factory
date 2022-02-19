const serverURL = "http://localhost:8000"


let table = document.getElementById('myTable')

let ShiftData = async () => {
    let response = await fetch(`${serverURL}/api/shifts/`)
    let data = await response.json()
    return data
}

let findDepByShiftID = async (shiftID) => {
    let empShiftRes = await fetch(`${serverURL}/api/empShifts/${shiftID}`)
    let empShiftData = await empShiftRes.json();
    let depRes = await fetch(`${serverURL}/api/department/${empShiftData.EmployeeID}`)
    let depData = await depRes.json();
    return depData;

}

let findEmpByShiftID = async (shiftID) => {
    let empShiftRes = await fetch(`${serverURL}/api/empShifts/${shiftID}`)
    let empShiftData = await empShiftRes.json();
    let empRes = await fetch(`${serverURL}/api/employee/${empShiftData.EmployeeID}`)
    let empData = await await empRes.json()
    return empData
}
findEmpByShiftID(1)

let displayShiftData = async () => {
    let shiftData = await ShiftData()

    shiftData.forEach(async shift => {
        let tr = document.createElement('tr')
        let shiftDep = document.createElement('td')
        let empName = document.createElement('td')
        let dateOfShift = document.createElement('td')
        let timeStart = document.createElement('td')
        let timeEnd = document.createElement('td')
        let normalDate = new Date(shift.dateOfShift)

        let dep = await findDepByShiftID(shift.ID)
        let emp = await findEmpByShiftID(shift.ID)

        shiftDep.innerText = dep.name

        empName.innerHTML = `<a href="../employee//edit_Employee.html?empid=${emp.ID}"> ${emp.fname} ${emp.lname} </a>`

        dateOfShift.innerText = normalDate.getDate() + "/" + parseInt(normalDate.getMonth() + 1) + "/" + normalDate.getFullYear()
        timeStart.innerText = shift.startTime
        timeEnd.innerText = shift.endTime

        tr.appendChild(shiftDep)
        tr.appendChild(empName)
        tr.appendChild(empName)
        tr.appendChild(dateOfShift)
        tr.appendChild(timeStart)
        tr.appendChild(timeEnd)
        table.appendChild(tr)
    });
}


displayShiftData()