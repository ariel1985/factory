let table = document.getElementById("myTable")



let getMangerName = async (id) => fetch(`https://localhost:44367/api/Employee//${id}`)

// let getShifts = async (id) => fetch(`https://localhost:44367/api/shift/${id}`)


let displayDepData = async () => {
    let ResponseDEP = await fetch('https://localhost:44367/api/Department')
    let depData = await ResponseDEP.json()
    let empData = await fetch('https://localhost:44367/api/Employee/')


    let count = 0
    let hasShift = false

    depData.forEach(dep => {
        count++
        console.log(dep)
        //CREATES A ROW FOR EACH DEP
        let row = document.createElement("tr")

        //Creates the counter for the amount of deps
        let countData = document.createElement('td')
        countData.innerText = count


        let nameData = document.createElement('td')
        nameData.innerText = dep.name


        let mangerData = document.createElement('td')



        getMangerName(dep.mangerFK).then(Response => Response.json())
            .then(data => {
                console.log(data)
                mangerData.innerText = data.fname + ' ' + data.lname

            })

        //Gets EMP shifts using emp ID and displays the shifts 
        let buttonData = document.createElement('td')

        let editButton = document.createElement('input')

        let deleteButton = document.createElement('input')

        deleteButton.setAttribute('type', 'button')
        editButton.setAttribute('type', 'button')

        editButton.setAttribute('value', 'EDIT')

        deleteButton.setAttribute('value', 'DELETE')
        console.log(dep.DepartmentID)
        editButton.addEventListener("click", e => {
            window.location.replace(`../DepartmentMenu/edit_Department.html?depid=${dep.ID}`)
        })

        deleteButton.addEventListener("click", e => {
            checkNumOfActions().then(answer => {
                    if (answer) {
                        fetch(`https://localhost:44367/api/Department/${dep.ID}`, {
                            method: 'delete'
                        })
                        alert("deleted")
                        window.location.replace(`../DepartmentMenu/departmentMenu.html`)
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