let selectDeps = document.getElementById("deps");
let selectYear = document.getElementById("StartOfWorkingYear")
let fname = document.getElementById("fname")
let lname = document.getElementById("lname")
const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('empid');
let select = document.getElementById("StartOfWorkingYear");
let form = document.getElementById("form")
const serverURL = "http://localhost:8000"

let putEmpData = () => {
    let empObj = {
        fname: fname.value,
        lname: lname.value,
        startYear: `${selectYear.value}-01-01`,
        DepartmentID: selectDeps.value
    }

    const putMethod = {
        method: 'PUT', 
        headers: {
            'Content-type': 'application/json; charset=UTF-8' 
        },
        body: JSON.stringify(empObj) 
    }

    console.log(putMethod)
    fetch(`${serverURL}/api/employee/${myParam}`, putMethod)
}

form.addEventListener("submit", (e) => {
    e.preventDefault()
    checkNumOfActions().then(answer => {
        if (answer) {
            putEmpData()
        } else {
            console.log("")
        }
    })
})

let year = new Date();
for (let index = year.getFullYear(); index > 1998; index--) {
    let option = document.createElement("option");
    option.text = index
    option.value = index
    select.appendChild(option)
}

fetch(`${serverURL}/api/Department`)
.then(Response => Response.json())
.then(data => {
    let selectDeps = document.getElementById("deps");
    for (let index = 0; index < data.length; index++) {
        let option = document.createElement("option");
        option.text = data[index].name;
        option.value = data[index].ID;
        selectDeps.appendChild(option);
    }
})

fetch(`${serverURL}/api/Employee/${myParam}`)
    .then(Response => Response.json())
    .then(data => {
        fname.value = data.fname
        lname.value = data.lname
        selectDeps.value = data.DepartmentID

        console.log(data.startYear)
        let options = document.querySelectorAll('option')
        let longDateToYear = new Date(data.startYear)

        options.forEach(op => {

            if (op.value == longDateToYear.getFullYear()) {
                op.setAttribute('selected', longDateToYear.getFullYear())
            }

        })


    })