
const serverURL = "http://localhost:8000"

let table = document.getElementById("myTable")
let getMangerName = async (id) => fetch(`${serverURL}/api/employee/${id}`)
let displayDepData = async () => {
    let ResponseDEP = await fetch(`${serverURL}/api/departments`)
    let depData = await ResponseDEP.json()
    let count = 0

    depData.forEach( dep => {
        count++;
        let row = document.createElement("tr")
        let countData = document.createElement('td')
        let nameData = document.createElement('td')
        let mangerData = document.createElement('td')
        countData.innerText = count
        nameData.innerText = dep.name
        getMangerName(dep.mangerFK).then(Response => Response.json())
            .then(data => {
                console.log(data)
                mangerData.innerText = data.fname + ' ' + data.lname

            })

        let buttonData = document.createElement('td')
        let editButton = document.createElement('input')
        let deleteButton = document.createElement('input')

        deleteButton.setAttribute('type', 'button')
        editButton.setAttribute('type', 'button')
        editButton.setAttribute('value', 'EDIT')
        deleteButton.setAttribute('value', 'DELETE')
        console.log(dep.DepartmentID)
        editButton.addEventListener("click", e => {
            window.location.replace(`../department/edit_Department.html?depid=${dep.ID}`)
        })

        deleteButton.addEventListener("click", e => {
            checkNumOfActions().then(answer => {
                    if (answer) {
                        fetch(`${serverURL}/api/department/${dep.ID}`, {
                            method: 'delete'
                        })
                        alert("deleted")
                        window.location.replace(`../department/department.html`)
                    }

                }
            )
        })

        buttonData.appendChild(deleteButton)
        buttonData.appendChild(editButton)

        row.appendChild(countData)
        row.appendChild(nameData)
        row.appendChild(mangerData)
        row.appendChild(buttonData)
        table.appendChild(row)
    })
}

displayDepData()