window.onload = () => {
    loadProfile()
}

async function loadProfile() {
    const payload = localStorage.getItem("payload")
    const payload_parse = JSON.parse(payload)
    const request_user_id = payload_parse.user_id

    console.log(request_user_id)
    const response = await fetch(`http://127.0.0.1:8000/user/profile/${request_user_id}/`, {
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access"),
        },
    })
    const response_json = await response.json()
    console.log((response_json))

    const username_json = document.getElementById("update_username")
    const nickname = document.getElementById("update_nickname")
    const email = document.getElementById("update_email")
    const user_image = document.getElementById("image")
    username_json.innerText = `${response_json.username}`
    nickname.setAttribute("value", `${response_json.nickname}`)
    email.setAttribute("value", `${response_json.email}`)
    user_image.src = 'http://127.0.0.1:8000' + response_json.image

}

async function handleUpdateProfile() {
    const payload = localStorage.getItem("payload")
    const payload_parse = JSON.parse(payload)
    const request_user_id = payload_parse.user_id

    const formData = new FormData();

    formData.append("email", document.getElementById("update_email").value);
    formData.append("nickname", document.getElementById("update_nickname").value);
    if (document.getElementById("update_image").files[0]) {
        formData.append("image", document.getElementById("update_image").files[0]);
    }

    const response = await fetch(`http://127.0.0.1:8000/user/profile/${request_user_id}/`, {
        method: "PUT",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        body: formData,
    });

    console.log(response)
    if (response.status == 200) {
        location.reload()
    }
    else if (response.status == 403) {
        const errorData = await response.json();
        document.getElementById("profile_update_errors").innerText = errorData.message;
    } else {
        document.getElementById("profile_update_errors").innerText = "회원정보 수정 실패.";
    }
}

function hadleProfilePreview(input) {
    console.log(input.files)
    if (input.files && input.files.length > 0) {
        var previewContainer = document.getElementById('update_image');

        var reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById("image").src = e.target.result;
            // console.log(e.target.result)
        };
        reader.readAsDataURL(input.files[0]);
    }
}