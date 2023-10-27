async function handleLogin() {
    const username = document.getElementById("id_username").value; // 사용자명을 가져옴
    const password = document.getElementById("id_password").value; // 비밀번호를 가져옴
    const response = await fetch('<http://127.0.0.1:8000/user/login/>',  { // 서버로 POST 요청을 보냄
    headers: {
        "content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ // 사용자명과 비밀번호를 JSON 형식으로 변환하여 요청에 첨부
        username: username,
        password: password,
    }),
    });

    const response_json = await response.json(); // 응답을 JSON 형태로 파싱

    const base64Url = response_json.access.split('.')[1];          // JWT 토큰에서 payload 부분을 추출
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g,'/'); // URL 안전 문자로 변환
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2); // URL 디코딩
    }).join(''));

    localStorage.setItem("access", response_json.access);     // JWT 액세스 토큰을 로컬 스토리지에 저장
    localStorage.setItem("refresh", response_json.refresh);   // JWT 리프레시 토큰을 로컬 스토리지에 저장
    localStorage.setItem("payload",jsonPayload);              // JWT 토큰의 payload를 로컬 스토리지에 저장

    window.location.href="<http://127.0.0.1:5500/user/profile.html>" // 프로필 페이지로 리다이렉션
}
