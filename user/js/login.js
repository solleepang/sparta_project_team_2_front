
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

    const base64Url = response_json.access.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g,'/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    

    localStorage.setItem("access", response_json.access);
    localStorage.setItem("refresh", response_json.refresh);
    localStorage.setItem("payload",jsonPayload);
   
    
    window.location.href="http://127.0.0.1:5500/user/profile.html"
}
