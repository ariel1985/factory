const empDropbox = document.getElementById('emp')
const date = document.getElementById('date')
const btn = document.getElementById('btn')
const start = document.getElementById('start')
const end = document.getElementById('end')
const form = document.getElementById('form')

const serverURL = "http://localhost:8000"

fetch(`${serverURL}/api/employees`)
    .then(Response => Response.json())
    .then(data => {

        for (let i = 0; i < data.length; i++) {
            let option = document.createElement("option");
            option.text = data[i].fname + " " + data[i].lname;
            option.value = data[i].ID;
            empDropbox.appendChild(option)
        }
    })

form.addEventListener('submit', e => {
    e.preventDefault()

    let shiftObj = {
        "employeeID": empDropbox.value,
        "dateOfShift": `${date.value}T00:00:00`,
        "startTime": start.value,
        "endTime": end.value
    }

    const postMethod = {
        method: 'POST', // Method itself
        headers: {
            'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
        },
        body: JSON.stringify(shiftObj) // We send data in JSON format
    }


    checkNumOfActions().then(answer => {
        if (answer) {
            fetch(`${serverURL}/api/shift/add`, postMethod)
        }
    })
})