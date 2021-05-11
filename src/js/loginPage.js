

window.onload = async () => {
    document.getElementById("postBtn").addEventListener("click", (e) => handlePost(e))

}


const handlePost = async (e) => {
    e.preventDefault()
    const adminLogin = {}

    const username = document.getElementById("username");
    const password = document.getElementById("password");

    adminLogin.username = username.value;
    adminLogin.password = password.value;

    const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(adminLogin)
    })

    if(res.status === 200){
        window.location.assign("/adminpage.html")
    } else {
        alert("Fel användarnamn eller lösenord.")
    }


    
}
