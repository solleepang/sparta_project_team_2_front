// window.onload = () => {
//     console.log('로그인 페이지 연결 완료')
// }

// async function handleLogin() {

//     const username = document.getElementById('id_username').value
//     const password = document.getElementById('id_password').value


//     console.log(username, password)

//     const response = await fetch('http://127.0.0.1:8000/user/login/', {

//         headers : {
//             'Content-type': 'application/json',
//         },
//         method : 'POST',
//         body : JSON.stringify({
//             "username" : username,
//             "password" : password
//         })
//     })

//     if (response.status == 200) {

//         const response_json = await response.json()

//         localStorage.setItem("access", response_json.access)
//         localStorage.setItem("refresh", response_json.refresh)
        

//         const base64Url = response_json.access.split('.')[1];
//         const base64 = base64Url.replace(/-/g, '+').replace(/_/g,'/');
//         const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
//         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//         }).join(''));

//         localStorage.setItem("payload",jsonPayload);

//         alert('로그인 성공')

//         window.location.href = "/index.html"
//     } 
//     else if (response.status == 404) {
//         document.getElementById("error-message").innerText = '회원 정보를 찾을 수 없습니다.';
//     }
//     else {
//         document.getElementById("error-message").innerText = '로그인 실패. id과 password는 필수 입력값입니다.';
//     }
// }

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
    // if (!response.ok) {
    //     throw new Error(
    //         `Server returned an error ${response.status}: ${response.statustext}`
    //     );
    // }
    const response_json = await response.json();
    console.log(response_json);

    localStorage.setItem("access", response_json.access);
    localStorage.setItem("refresh", response_json.refresh);
    
    // const base64Url = response_json.access.split(".")[1];
    // const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    // const jsonPayload = decodeURIComponent(atob(base64).split("")
    //     .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
    //     .join("")
    // );
    // localStorage.setItem("payload", jsonPayload);
    // alert("환영합니다.");
    // window.location.replace(`http://127.0.0.1:8000/article/`);
    // } 
    // catch (error) {
    //     console.error("Error during login:", error.message);
    //     alert("회원정보가 일치하지 않습니다")
    // }
}
