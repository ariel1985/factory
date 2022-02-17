let table = document.getElementById('myTable')



let ShiftData = async () => {
    let response = await fetch('https://localhost:44367/api/shift/')
    let data = await response.json()
    return data
}

let findDepByShiftID = async (shiftID) => {
    let empShiftRes = await fetch(`https://localhost:44367/api/empShifts/${shiftID}`)
    let empShiftData = await empShiftRes.json();
    let depRes = await fetch(`https://localhost:44367/api/Department/${empShiftData.EmployeeID}`)
    let depData = await depRes.json();
    return depData;

}

let findEmpByShiftID = async (shiftID) => {
    let empShiftRes = await fetch(`https://localhost:44367/api/empShifts/${shiftID}`)
    let empShiftData = await empShiftRes.json();
    let empRes = await fetch(`https://localhost:44367/api/employee/${empShiftData.EmployeeID}`)
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
        console.log(dep)
        console.log(shift)
        // let empRes = await fetch('https://localhost:44367api/Employee/')

        shiftDep.innerText = dep.name

        empName.innerHTML = `<a href="../employeeMenu//edit_Employee.html?empid=${emp.ID}"> ${emp.fname} ${emp.lname} </a>`

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