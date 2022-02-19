let form = document.getElementById("form")
let username = document.getElementById("inuser")
let userpass = document.getElementById("inpass")
let loginObj = {
    "username": "null",
    "password": "null"
}

const serverURL = "http://localhost:8000"

let login = async (loginObj) => {
    let output = false
    const rawResponse = await fetch(`${serverURL}/api/authenticate/`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: loginObj.username,
            password: loginObj.password
        })
    });
    const json = await rawResponse.json();
    const user = json.data
    if (user.ID == 0) {
        alert("Password/username is not correct")
    } else if (user.id != 0) {
        let today = new Date()
        window.localStorage.setItem("id", user.ID)
        window.localStorage.setItem('fullname', user.full_name)
        window.localStorage.setItem('user', user.username)
        window.localStorage.setItem('numOfActions', parseInt(user.numOfActions))

        if(parseInt(window.localStorage.getItem(`lastLogin${user.username}`)) == null) 
        {
            console.log("NO USER LIKE THIS ON SYSTEM LETS ADD HIM")
            window.localStorage.setItem(`lastLogin${loginObj.username}`, today.getTime())
        }
        else 
        {

            let lastLoginPlus24hours = parseInt(window.localStorage.getItem(`lastLogin${loginObj.username}`)+86400)
            if (today.getTime() > lastLoginPlus24hours) 
            {
                let numberOfActionsObj = { numOfActions: 10}
        
                const putMethod = {
                    method: 'PUT', // Method itself
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
                    },
                    body: JSON.stringify(numberOfActionsObj) // We send data in JSON format
                }
        
                window.localStorage.setItem('numOfActions', 10)
                fetch(`${serverURL}/api/action/${user.ID}`, putMethod)
                .then(res => console.log("YASS"))
                window.localStorage.setItem(`lastLogin${loginObj.username}`, today.getTime())
            }

        }
        output = true
    }
    return answer
}



form.addEventListener("submit", e => {
    e.preventDefault() // do not submit by HTML
    e.stopPropagation()

    loginObj.username = username.value;
    loginObj.password = userpass.value;

    login(loginObj).then(Response => {
        if (Response) {
            window.location.replace('homepage/homepage.html')
        }

    })
})