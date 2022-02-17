const empDropbox = document.getElementById('emp')
const date = document.getElementById('date')
const btn = document.getElementById('btn')
const start = document.getElementById('start')
const end = document.getElementById('end')
const form = document.getElementById('form')
console.log(empDropbox)

fetch('https://localhost:44367/api/Employee')
    .then(Response => Response.json())
    .then(data => {

        for (let index = 0; index < data.length; index++) {
            console.log(data[index])

            let option = document.createElement("option");
            option.text = data[index].fname + " " + data[index].lname;
            option.value = data[index].ID;
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
            fetch('https://localhost:44367/api/shift/add', postMethod)
            alert("Added a shift!")
        }
    })


})