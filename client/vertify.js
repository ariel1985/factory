let logoutBtn = document.getElementById("logout")
let fullnameNav = document.getElementById("fullnamenav")
let numOfActionsNav = document.getElementById("numOfActionsnav")
// window.localStorage.setItem("id", "null")
// window.localStorage.setItem('fullname', "offline")
// window.localStorage.setItem('user', "offline")
// window.localStorage.setItem('numOfActions', 1)

const serverURL = "https://localhost:8000"

let checkNumOfActions = async () => {
    let answer = false;
    let userID = localStorage.getItem('id')
    let Response = await fetch(`${serverURL}/api/Action/${userID}`)
    let numOfActionData = await Response.json()
    if (!numOfActionData > 0) {
        alert("Your amount of Actions is 0, you can not pefome any actions")
    } else {
        answer = true
        // /5
        let numberOfActionsObj = {
            numOfActions: numOfActionData - 1
        }

        const putMethod = {
            method: 'PUT', // Method itself
            headers: {
                'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
            },
            body: JSON.stringify(numberOfActionsObj) // We send data in JSON format
        }

        window.localStorage.setItem('numOfActions', numOfActionData - 1)
        numOfActionsNav.innerText = numOfActionData - 1
        console.log(putMethod)
        fetch(`${serverURL}/api/Action/${userID}`, putMethod)

    }
    return answer
}


let isLoggedin = async () => {
    // let VertifyObj = { "ID": "9" ,"Full_name": "OFFLINE", "username": "OFFLINE", "numOfActions": 0}
    let VertifyObj = {}
    VertifyObj.ID = localStorage.getItem("id")
    VertifyObj.Full_name = localStorage.getItem("fullname")
    VertifyObj.username = localStorage.getItem('user')
    VertifyObj.numOfActions = localStorage.getItem('numOfActions')

    //SENDS POST REQUEST TO USERBASETABLE AND RETURNS A CUSTOM USEROBJECT WITH THE PASSWORD
    const rawResponse = await fetch(`${serverURL}/api/Vertify`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ID: VertifyObj.ID,
            Full_name: VertifyObj.Full_name,
            username: VertifyObj.username,
            numOfActions: VertifyObj.numOfActions
        })
    });
    const response = await rawResponse.json();
    console.log(response)
    if (response == false) {
        window.location.replace(`${serverURL}/login.html`)
    }
    if (response) {
        console.log("LOGGED IN ALL NICE")
    }
}

window.addEventListener('load', (event) => {
    isLoggedin();
    console.log('page is fully loaded');
    fullnameNav.innerText = localStorage.getItem("fullname")
    numOfActionsNav.innerText = localStorage.getItem('numOfActions')

});

let logOut = () => {
    window.localStorage.setItem("id", null)
    window.localStorage.setItem('fullname', null)
    window.localStorage.setItem('user', null)
    window.localStorage.setItem('numOfActions', null)
    location.href = '/login.html'
}

logoutBtn.addEventListener("click", e => {
    // e.stopPropagation()
    logOut()

})