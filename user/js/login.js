
async function handleLogin() {
    // try {
    console.log("로긴연결");
    const username = document.getElementById("id_username").value;
    const password = document.getElementById("id_password").value;
    console.log(username, password);
    const response = await fetch('http://127.0.0.1:8000/user/login/',  {
    headers: {
        "content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
        username: username,
        password: password,
    }),
    });
    const response_json = await response.json();
    console.log(response_json);

    localStorage.setItem("access", response_json.access);
    localStorage.setItem("refresh", response_json.refresh);
    
}
