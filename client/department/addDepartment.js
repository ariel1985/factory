const form = document.getElementById('form')
const nameInput = document.getElementById('name')
const mangerDropbox = document.getElementById('manger')

const serverURL = "http://localhost:8000"

fetch(`${serverURL}/api/employees`)
.then(Response => Response.json())
.then(data => {
    for (let index = 0; index < data.length; index++) {
        let option = document.createElement("option");
        option.text = data[index].fname + " " + data[index].lname;
        option.value = data[index].ID;
        mangerDropbox.value = data.ID
        mangerDropbox.appendChild(option);

    }
})

form.addEventListener("submit", (e) => {
    e.preventDefault()
    let depObj = {
        name: nameInput.value,
        mangerFK: parseInt(mangerDropbox.value)
    }

    const postMethod = {
        method: 'POST', // Method itself
        headers: {
            'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
        },
        body: JSON.stringify(depObj) // We send data in JSON format
    }

    checkNumOfActions().then(answer => {
        if (answer) {
            fetch(`${serverURL}/api/departments/`, postMethod)
            location.reload();
        }
    })
})