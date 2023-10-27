window.onload = () => {
    loadMypage() // 마이페이지 로딩 함수 호출
}

function userIdSearch() {
    const url = window.location.href
    const url_split = url.split(["?"])[1]
    const user_id = url_split.split(["="])[1] // URL에서 유저 아이디 추출

    return user_id
}

// 마이페이지 로딩 함수
async function loadMypage() {

    const user_id = userIdSearch() // 유저 아이디 가져오기

    const response = await fetch(`http://127.0.0.1:8000/user/mypage/${user_id}/`, {
        method : 'GET'
    })
    const response_json = await response.json()
    console.log(response_json)
    console.log(response_json.nickname)

    const user_image = document.getElementById("profile_image") // 프로필 이미지 엘리먼트 가져오기
    const nickname = document.getElementById("nickname") // 닉네임 엘리먼트 가져오기
    const following_num = document.getElementById("following_count") // 팔로잉 수 엘리먼트 가져오기
    const follower_num = document.getElementById("follower_count") // 팔로워 수 엘리먼트 가져오기

    nickname.innerText = response_json.nickname // 닉네임 표시
    following_num.innerText = response_json.following_count // 팔로잉 수 표시
    follower_num.innerText = response_json.follower_count // 팔로워 수 표시
    const user_image_img = document.createElement('img')
    user_image_img.style.height = "100px";

    user_image_img.src = "<http://127.0.0.1:8000>" + response_json.image // 프로필 이미지 소스 설정
    user_image_img.setAttribute("alt","user image")
    user_image.appendChild(user_image_img) // 프로필 이미지 엘리먼트에 추가
}

// 팔로우 처리 함수
async function handleFollow() {
    if (localStorage.getItem("access"))

        var user_id = userIdSearch() // 유저 아이디 가져오기

        const response = await fetch(`http://127.0.0.1:8000/user/follow/${user_id}/`, {
            method : 'POST',
            headers: {
                "Authorization" : "Bearer " + localStorage.getItem("access"),
            },

        })
    location.reload() // 페이지 리로드
}
