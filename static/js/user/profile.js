window.onload = () => {
    loadProfile() // 프로필 정보를 불러오는 함수 호출
}

async function loadProfile() {
    const payload = localStorage.getItem("payload")
    const payload_parse = JSON.parse(payload)
    const request_user_id = payload_parse.user_id

    const response = await fetch(`http://127.0.0.1:8000/user/profile/${request_user_id}/`, {
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access"),
        },
    })
    const response_json = await response.json()

    const username_json = document.getElementById("update_username") // HTML 요소의 id가 "update_username"인 요소를 가져옴
    const nickname = document.getElementById("update_nickname")      // HTML 요소의 id가 "update_nickname"인 요소를 가져옴
    const email = document.getElementById("update_email")            // HTML 요소의 id가 "update_email"인 요소를 가져옴
    const user_image = document.getElementById("image")              // HTML 요소의 id가 "image"인 요소를 가져옴
    username_json.innerText = `${response_json.username}`            // "update_username" 요소의 텍스트를 response_json의 username 값으로 설정
    nickname.setAttribute("value", `${response_json.nickname}`)      // "update_nickname" 요소의 value 속성을 response_json의 nickname 값으로 설정
    email.setAttribute("value", `${response_json.email}`)            // "update_email" 요소의 value 속성을 response_json의 email 값으로 설정
    user_image.src = '<http://127.0.0.1:8000>' + response_json.image // "image" 요소의 src 속성을 '<http://127.0.0.1:8000>' + response_json의 image 값으로 설정

}

async function handleUpdateProfile() {
    const payload = localStorage.getItem("payload")
    const payload_parse = JSON.parse(payload)
    const request_user_id = payload_parse.user_id

    const formData = new FormData();

    formData.append("email", document.getElementById("update_email").value);        // "update_email" 요소의 value 값을 FormData에 추가
    formData.append("nickname", document.getElementById("update_nickname").value);  // "update_nickname" 요소의 value 값을 FormData에 추가
    if (document.getElementById("update_image").files[0]) {
        formData.append("image", document.getElementById("update_image").files[0]); // "update_image" 요소의 파일을 FormData에 추가
    }

    const response = await fetch(`http://127.0.0.1:8000/user/profile/${request_user_id}/`, {
        method: "PUT",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        body: formData, // FormData를 요청의 본문으로 설정
    });

    if (response.status == 200) {
        location.reload() // 페이지 새로고침
    }
    else if (response.status == 403) {
        const errorData = await response.json();
        document.getElementById("profile_update_errors").innerText = errorData.message; // "profile_update_errors" 요소의 텍스트를 에러 메시지로 설정
    } else {
        document.getElementById("profile_update_errors").innerText = "회원정보 수정 실패."; // "profile_update_errors" 요소의 텍스트를 "회원정보 수정 실패."로 설정
    }
}

function hadleProfilePreview(input) {
    if (input.files && input.files.length > 0) {
        var previewContainer = document.getElementById('update_image'); // HTML 요소의 id가 "update_image"인 요소를 가져옴

        var reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById("image").src = e.target.result; // "image" 요소의 src 속성을 FileReader의 결과로 설정
        };
        reader.readAsDataURL(input.files[0]);
    }
}
