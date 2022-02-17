let selectDeps = document.getElementById("deps");
let selectYear = document.getElementById("StartOfWorkingYear")
let fname = document.getElementById("fname")
let lname = document.getElementById("lname")
const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('empid');
let select = document.getElementById("StartOfWorkingYear");
let form = document.getElementById("form")

// let numOfActionsNav = document.getElementById("numOfActionsnav")


// let checkNumOfActions = async () => 
// {
// let answer = false;
// let userID = localStorage.getItem('id')  
// let Response = await fetch(`https://localhost:44367/api/Action/${userID}`)
// let numOfActionData = await Response.json()
// if(!numOfActionData > 0) 
// {
//     alert("Your amount of Actions is 0, you can not pefome any actions")
// }
// else
// {
// answer = true
// // /5
// let numberOfActionsObj =  {numOfActions: numOfActionData-1}   

//         const putMethod = {
//             method: 'PUT', // Method itself
//             headers: {
//              'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
//             },
//             body: JSON.stringify(numberOfActionsObj) // We send data in JSON format
//            }

//     window.localStorage.setItem('numOfActions', numOfActionData-1)
//     numOfActionsNav.innerText = numOfActionData-1
//     console.log(putMethod)
//     fetch(`https://localhost:44367/api/Action/${userID}`, putMethod)

// }
// return answer
// }




let putEmpData = () => {
    let empObj = {
        fname: fname.value,
        lname: lname.value,
        startYear: `${selectYear.value}-01-01`,
        DepartmentID: selectDeps.value
    }

    const putMethod = {
        method: 'PUT', // Method itself
        headers: {
            'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
        },
        body: JSON.stringify(empObj) // We send data in JSON format
    }

    console.log(putMethod)
    fetch(`https://localhost:44367/api/Employee/${myParam}`, putMethod)
}



//put  request
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


//adds all the dates to the Start of Working year
let year = new Date();
for (let index = year.getFullYear(); index > 1998; index--) {

    let option = document.createElement("option");
    option.text = index
    option.value = index
    select.appendChild(option)
}


fetch('https://localhost:44367/api/Department')
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



fetch(`https://localhost:44367/api/Employee/${myParam}`)
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